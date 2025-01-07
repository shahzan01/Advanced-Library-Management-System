import prisma from "../config/db";

export const borrowBook = async (userId: string, bookId: string) => {
  const book = await prisma.book.findUnique({
    where: { id: bookId },
    include: { borrowedBy: true },
  });
  const user: any = await prisma.user.findUnique({
    where: { id: userId },
    include: { borrowedBooks: true },
  });

  if (!book) {
    throw new Error("Book not found");
  }

  if (book.copies <= 0) {
    throw new Error("No copies available for this book");
  }

  if (user.borrowedBooks.length >= 3) {
    throw new Error("You can Borrow Maximum 3 books at a Time");
  }
  if (user?.emailVerified === false) {
    throw new Error("Verify your Email First to borrow a book");
  }
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 14);

  await prisma.$transaction([
    prisma.borrowedBook.create({
      data: {
        userId,
        bookId,
        dueDate,
      },
    }),
    prisma.book.update({
      where: { id: bookId },
      data: {
        copies: book.copies - 1,
      },
    }),
  ]);

  return { message: "Book borrowed successfully", dueDate };
};
