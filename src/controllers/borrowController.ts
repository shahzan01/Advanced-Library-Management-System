import { Request, Response } from "express";
import prisma from "../config/db";

export const borrowBook = async (req: Request, res: Response) => {
  const { userId, bookId } = req.body;

  try {
    const borrowedBooks = await prisma.borrowedBook.findMany({
      where: { userId, returnedAt: null },
    });

    if (borrowedBooks.length >= 3)
      return res.status(400).json({ error: "Borrowing limit reached" });

    const book = await prisma.book.findUnique({ where: { id: bookId } });
    if (!book || book.copies <= 0)
      return res.status(400).json({ error: "Book unavailable" });

    const borrowed = await prisma.borrowedBook.create({
      data: {
        userId,
        bookId,
        dueDate: new Date(new Date().setDate(new Date().getDate() + 14)),
      },
    });

    await prisma.book.update({
      where: { id: bookId },
      data: { copies: { decrement: 1 } },
    });

    return res.status(201).json({ message: "Book borrowed", borrowed });
  } catch (error) {
    return res.status(500).json({ error: "Error borrowing book" });
  }
};
