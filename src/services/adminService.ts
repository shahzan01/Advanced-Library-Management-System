import prisma from "../config/db";

export const getMostBorrowedBooks = async () => {
  const borrowedBooks = await prisma.borrowedBook.groupBy({
    by: ["bookId"],
    _count: { bookId: true },
    orderBy: { _count: { bookId: "desc" } },
    take: 5,
  });

  const books = await Promise.all(
    borrowedBooks.map(async (record) => {
      const book = await prisma.book.findUnique({
        where: { id: record.bookId },
      });
      return {
        title: book?.title,
        borrowCount: record._count.bookId,
      };
    })
  );

  return books;
};

export const generateMonthlyUsageReport = async (
  month: number,
  year: number
) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  const totalBooksBorrowed = await prisma.borrowedBook.count({
    where: {
      borrowedAt: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  const totalFinesCollected = await prisma.transaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  const mostBorrowedBooks = await prisma.borrowedBook.groupBy({
    by: ["bookId"],
    _count: {
      bookId: true,
    },
    where: {
      borrowedAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: {
      _count: {
        bookId: "desc",
      },
    },
    take: 5,
  });

  const mostBorrowedBooksDetails = await Promise.all(
    mostBorrowedBooks.map(async (entry) => {
      const book = await prisma.book.findUnique({
        where: { id: entry.bookId },
        select: { title: true, isbn: true },
      });

      return {
        title: book?.title,
        isbn: book?.isbn,
        borrowCount: entry._count.bookId,
      };
    })
  );

  return {
    reportPeriod: `${startDate.toISOString()} to ${endDate.toISOString()}`,
    totalBooksBorrowed,
    totalFinesCollected: totalFinesCollected._sum.amount || 0,
    mostBorrowedBooks: mostBorrowedBooksDetails,
  };
};
