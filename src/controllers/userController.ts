import { Request, Response } from "express";
import prisma from "../config/db";

export const getUserDetails = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { borrowedBooks: true },
  });
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json(user);
};

export const deleteUserAccount = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const user = await prisma.user.update({
    where: { id: userId },
    data: { isDeleted: true },
  });
  res.json(user);
};

export const getFines = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const books = await prisma.borrowedBook.findMany({
      where: { userId: user?.id, returnedAt: null },
      include: { book: true },
    });

    res.status(200).json(books);
  } catch {
    res.status(500).json({ error: "Internal server Error" });
    return;
  }
};
