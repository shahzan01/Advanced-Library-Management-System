import { Request, Response } from "express";
import prisma from "../config/db";

export const payFine = async (req: Request, res: Response) => {
  const { userId, amount, description } = req.body;

  try {
    const transaction = await prisma.transaction.create({
      data: { userId, amount, description },
    });

    return res.status(201).json({ message: "Fine paid", transaction });
  } catch (error) {
    return res.status(500).json({ error: "Error processing payment" });
  }
};
