// src/services/invoiceService.ts

import prisma from "../config/db";

export const generateInvoiceForBorrow = async (borrowedBookId: string) => {
  const borrowedBook = await prisma.borrowedBook.findUnique({
    where: { id: borrowedBookId },
    include: { user: true, book: true },
  });

  if (!borrowedBook) {
    throw new Error("Borrowed book not found.");
  }

  const { user, book, borrowedAt, dueDate, returnedAt, fine } = borrowedBook;

  const invoiceData = {
    invoiceId: `INV-${Date.now()}`,
    type: "Book Borrow",
    user: { id: user.id, name: user.name, email: user.email },
    book: { title: book.title, isbn: book.isbn },
    borrowedAt,
    dueDate,
    returnedAt,
    fine,
    totalAmount: fine,
    generatedAt: new Date(),
  };

  return invoiceData;
};

export const generateInvoiceForReturn = async (borrowedBookId: string) => {
  const borrowedBook = await prisma.borrowedBook.findUnique({
    where: { id: borrowedBookId },
    include: { user: true, book: true },
  });

  if (!borrowedBook) {
    throw new Error("Borrowed book not found.");
  }

  const { user, book, fine, returnedAt, dueDate, borrowedAt } = borrowedBook;

  const invoiceData = {
    invoiceId: `RET-${Date.now()}`,
    type: "Book Return",
    user: { id: user.id, name: user.name, email: user.email },
    book: { title: book.title, isbn: book.isbn },
    borrowedAt,
    dueDate,
    returnedAt: returnedAt || new Date(),
    fine,
    totalAmount: fine,
    generatedAt: new Date(),
  };

  return invoiceData;
};

export const generateInvoiceForPayment = async (borrowedBookId: string) => {
  const borrowedBook = await prisma.borrowedBook.findUnique({
    where: { id: borrowedBookId },
    include: { user: true, book: true },
  });

  if (!borrowedBook) {
    throw new Error("Borrowed book not found.");
  }

  const { user, book, fine, returnedAt, dueDate, borrowedAt } = borrowedBook;

  const invoiceData = {
    invoiceId: `PAY-${Date.now()}`,
    type: "Fine Payment",
    user: { id: user.id, name: user.name, email: user.email },
    book: { title: book.title, isbn: book.isbn },
    borrowedAt,
    dueDate,
    returnedAt,
    fine,
    totalAmount: fine,
    generatedAt: new Date(),
  };

  return invoiceData;
};
