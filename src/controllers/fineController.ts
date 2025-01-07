import { Request, Response } from "express";
import prisma from "../config/db";

export const calculateFine = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const borrowedBook = await prisma.borrowedBook.findUnique({
      where: { id: id },
    });
    if (!borrowedBook) {
      res.status(404).json({ error: "Borrowed book not found" });
      return;
    }

    const today = new Date();
    const overdueDays = Math.max(
      0,
      Math.floor(
        (today.getTime() - borrowedBook.dueDate.getTime()) /
          (1000 * 60 * 60 * 24)
      )
    );
    const fine = overdueDays * 1;

    res.status(200).json({ overdueDays, fine });
    return;
  } catch (error) {
    res.status(500).json({ error: "Error calculating fine" });
    return;
  }
};

export const payFineForBook = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const borrowedBook = await prisma.borrowedBook.findUnique({
      where: { id: id },
    });
    if (!borrowedBook) {
      res.status(404).json({ error: "Borrowed book not found" });
      return;
    }

    const today = new Date();
    const overdueDays = Math.max(
      0,
      Math.floor(
        (today.getTime() - borrowedBook.dueDate.getTime()) /
          (1000 * 60 * 60 * 24)
      )
    );
    const fine = overdueDays * 1;

    if (fine > 0) {
      await prisma.transaction.create({
        data: {
          userId: borrowedBook.userId,
          amount: fine,
          description: `fine Paid by ${req.user?.email} of $${fine} for the book ${borrowedBook.bookId}`,
        },
      });

      res.status(200).json({ message: "Fine paid successfully", fine });
      return;
    }

    res.status(400).json({ error: "No fine due" });
    return;
  } catch (error) {
    res.status(500).json({ error: "Error paying fine" });
    return;
  }
};
