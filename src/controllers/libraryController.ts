import { Request, Response } from "express";
import { borrowBook } from "../services/borrowServices";
import { returnBook } from "../services/returnService";
import { payFine } from "../services/paymentService";
import {
  getMostBorrowedBooks,
  generateMonthlyUsageReport,
} from "../services/adminService";

export const BorrowBook = async (req: Request, res: Response) => {
  const { userId, bookId } = req.body;
  try {
    const result = await borrowBook(userId, bookId);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const ReturnBook = async (req: Request, res: Response) => {
  const { borrowedBookId } = req.body;
  try {
    const result = await returnBook(borrowedBookId);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const PayFine = async (req: Request, res: Response) => {
  const { userId, borrowedBookId } = req.body;
  try {
    const result = await payFine(userId, borrowedBookId);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const GetMostBorrowedBooks = async (_req: Request, res: Response) => {
  try {
    const result = await getMostBorrowedBooks();
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getMonthlyUsageReport = async (req: Request, res: Response) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      res.status(400).json({ error: "Month and year are required." });
      return;
    }

    const report = await generateMonthlyUsageReport(
      Number(month),
      Number(year)
    );
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
