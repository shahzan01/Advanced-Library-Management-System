import prisma from "../config/db";

export const payFine = async (userId: string, borrowedBookId: string) => {
  const borrowedBook = await prisma.borrowedBook.findUnique({
    where: { id: borrowedBookId },
    include: { user: true },
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

  await prisma.transaction.create({
    data: {
      userId,
      amount: fine,
      borrowedBookId,
      description: `Fine for book ${borrowedBook.bookId}`,
    },
  });

  return { message: "Fine paid successfully" };
};
