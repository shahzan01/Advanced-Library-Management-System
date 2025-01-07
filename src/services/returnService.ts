import prisma from "../config/db";

export const returnBook = async (borrowedBookId: string) => {
  const borrowedBook = await prisma.borrowedBook.findUnique({
    where: { id: borrowedBookId },
    include: { user: true, book: true },
  });
  if (!borrowedBook) {
    throw new Error("Borrowed book record not found");
  }

  if (borrowedBook.returnedAt) {
    throw new Error("This book has already been returned");
  }

  const now = new Date();
  const isLate = now > borrowedBook.dueDate;
  let fine = borrowedBook.fine;

  if (isLate) {
    const daysLate = Math.ceil(
      (now.getTime() - borrowedBook.dueDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    fine += daysLate * 1;
  }

  const unpaidTransactions = await prisma.transaction.findMany({
    where: {
      userId: borrowedBook.userId,
      borrowedBookId: borrowedBook.id,
      description: `Fine for book ${borrowedBook.bookId}`,
      amount: fine,
    },
  });
  console.log(unpaidTransactions);

  if (fine > 0 && unpaidTransactions.length === 0) {
    throw new Error(`Please pay a fine of ₹${fine} before returning the book`);
  }

  await prisma.$transaction([
    prisma.borrowedBook.update({
      where: { id: borrowedBookId },
      data: {
        returnedAt: now,
        fine,
      },
    }),
    prisma.book.update({
      where: { id: borrowedBook.bookId },
      data: {
        copies: borrowedBook.book.copies + 1,
      },
    }),
  ]);

  return { message: "Book returned successfully", fine };
};
