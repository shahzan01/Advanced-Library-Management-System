import { Request, Response } from "express";
import prisma from "../config/db";

export const addAuthor = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const author = await prisma.author.create({
      data: { name },
    });

    res.status(201).json({ message: "Author added successfully", author });
    return;
  } catch (error) {
    res.status(500).json({ error: "Error adding author", details: error });
    return;
  }
};

export const getAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await prisma.author.findMany();
    res.status(200).json(authors);
    return;
  } catch (error) {
    res.status(500).json({ error: "Error fetching authors" });
    return;
  }
};
