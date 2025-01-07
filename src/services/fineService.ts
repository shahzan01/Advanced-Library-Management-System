import { Request, Response } from "express";
import prisma from "../config/db";

export const calculateFine = async (borrowedBookid: string) => {
  try {
    const borrowedBook = await prisma.borrowedBook.findUnique({
      where: { id: borrowedBookid },
    });
    if (!borrowedBook) {
      throw new Error("Borrowed book record not found");
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

    return { fine: fine, overdueDays: overdueDays };
  } catch (error) {
    throw new Error("Error in finding Fine for the book");
  }
};
