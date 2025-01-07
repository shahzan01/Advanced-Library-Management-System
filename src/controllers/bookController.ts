import { Request, Response } from "express";
import prisma from "../config/db";

export const addBook = async (req: Request, res: Response) => {
  const { isbn, title, description, copies, categories, authors } = req.body;

  try {
    const existingBook = await prisma.book.findUnique({
      where: { isbn: isbn },
    });

    if (existingBook && existingBook.isDeleted) {
      const restoredBook = await prisma.book.update({
        where: { isbn: isbn },
        data: {
          title,
          description,
          copies,
          categories: {
            deleteMany: {},
            create: categories.map((categoryId: string) => ({
              categoryId,
            })),
          },
          authors: {
            deleteMany: {},
            create: authors.map((authorId: string) => ({
              authorId,
            })),
          },
          isDeleted: false,
        },
      });

      res
        .status(201)
        .json({ message: "Book added successfully", restoredBook });
      return;
    }
    if (existingBook) {
      res.status(500).json({ error: "Book already present with same isbn" });
      return;
    }

    const book = await prisma.book.create({
      data: {
        isbn,
        title,
        description,
        copies,
        categories: {
          create: categories.map((categoryId: string) => ({
            categoryId,
          })),
        },
        authors: {
          create: authors.map((authorId: string) => ({
            authorId,
          })),
        },
      },
    });

    res.status(201).json({ message: "Book added successfully", book });
    return;
  } catch (error) {
    res.status(500).json({ error: "Error adding book", details: error });
    return;
  }
};

export const editBook = async (req: Request, res: Response) => {
  const id = req.params.id || req.body.id || req.query.id;
  const { title, description, copies, categories, authors } = req.body;

  try {
    const book = await prisma.book.update({
      where: { id },
      data: {
        title,
        description,
        copies,
        categories: {
          deleteMany: {},
          create: categories.map((categoryId: string) => ({
            categoryId,
          })),
        },
        authors: {
          deleteMany: {},
          create: authors.map((authorId: string) => ({
            authorId,
          })),
        },
      },
    });

    res.status(200).json({ message: "Book updated successfully", book });
    return;
  } catch (error) {
    res.status(500).json({ error: "Error editing book", details: error });
  }
  return;
};

export const deleteBook = async (req: Request, res: Response) => {
  const id = req.params.id || req.body.id || req.query.id;

  try {
    const book = await prisma.book.update({
      where: { id },
      data: { isDeleted: true },
    });

    res.status(200).json({ message: "Book soft-deleted successfully", book });
    return;
  } catch (error) {
    res.status(500).json({ error: "Error deleting book", details: error });
    return;
  }
};

export const getBookByISBN = async (req: Request, res: Response) => {
  const isbn = req.query.isbn || req.params.isbn || req.body.isbn;

  if (!isbn) {
    res.status(400).json({
      error: "Please provide ISBN to search for a book",
    });
    return;
  }

  try {
    const book = await prisma.book.findFirst({
      where: {
        isbn: String(isbn),
        isDeleted: false,
      },
      include: {
        authors: {
          include: {
            author: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    if (!book) {
      res.status(404).json({ error: "Book not found" });
      return;
    }

    res.status(200).json(book);
    return;
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching book details", details: error });
    return;
  }
};

export const getBookByTitle = async (req: Request, res: Response) => {
  const title = req.query.title || req.params.title || req.body.title;

  if (!title) {
    res.status(400).json({
      error: "Please provide title to search for a book",
    });
    return;
  }

  try {
    const book = await prisma.book.findFirst({
      where: {
        title: { contains: String(title), mode: "insensitive" },
        isDeleted: false,
      },
      include: {
        authors: {
          include: {
            author: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    if (!book) {
      res.status(404).json({ error: "Book not found" });
      return;
    }

    res.status(200).json(book);
    return;
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching book details", details: error });
    return;
  }
};

export const getBookDetailsByID = async (req: Request, res: Response) => {
  const id = req.query.id || req.params.id || req.body.id;
  try {
    const book = await prisma.book.findUnique({
      where: { id },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        authors: {
          include: {
            author: true,
          },
        },
      },
    });

    if (!book) {
      res.status(404).json({ error: "Book not found" });
      return;
    }

    res.status(200).json(book);
    return;
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching book details", details: error });
    return;
  }
};

export const searchBooks = async (req: Request, res: Response) => {
  const author = req.query.author || req.body.author || req.params.author;
  const category =
    req.query.category || req.body.category || req.params.category;

  try {
    const books = await prisma.book.findMany({
      where: {
        AND: [
          author
            ? {
                authors: {
                  some: {
                    author: {
                      name: {
                        contains: String(author),
                        mode: "insensitive",
                      },
                    },
                  },
                },
              }
            : {},
          category
            ? {
                categories: {
                  some: {
                    category: {
                      name: {
                        contains: String(category),
                        mode: "insensitive",
                      },
                    },
                  },
                },
              }
            : {},
        ],
        isDeleted: false,
      },
      include: {
        authors: {
          include: {
            author: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    res.status(200).json(books);
    return;
  } catch (error) {
    res.status(500).json({ error: "Error searching books", details: error });
    return;
  }
};

export const allBooks = async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany({
      where: { copies: { gt: 0 } },
    });

    res.status(200).json(books);
    return;
  } catch (error) {
    res.status(500).json({ error: "Error searching books", details: error });
    return;
  }
};
