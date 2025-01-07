import { Request, Response } from "express";
import {
  generateInvoiceForPayment,
  generateInvoiceForReturn,
  generateInvoiceForBorrow,
} from "../services/invoiceService";

export const getPaymentInvoice = async (req: Request, res: Response) => {
  try {
    const { borrowedBookId } = req.params;

    if (!borrowedBookId) {
      res.status(400).json({ error: "Borrowed book ID is required." });
      return;
    }

    const invoice = await generateInvoiceForPayment(borrowedBookId);
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getBorrowInvoice = async (req: Request, res: Response) => {
  try {
    const { borrowedBookId } = req.params;

    if (!borrowedBookId) {
      res.status(400).json({ error: "Borrowed book ID is required." });
      return;
    }

    const invoice = await generateInvoiceForBorrow(borrowedBookId);
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getReturnInvoice = async (req: Request, res: Response) => {
  try {
    const { borrowedBookId } = req.params;

    if (!borrowedBookId) {
      res.status(400).json({ error: "Borrowed book ID is required." });
      return;
    }

    const invoice = await generateInvoiceForReturn(borrowedBookId);
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
