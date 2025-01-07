// src/routes/invoiceRoutes.ts
import { Router } from "express";
import {
  getBorrowInvoice,
  getPaymentInvoice,
  getReturnInvoice,
} from "../controllers/invoiceController";
import { auth } from "../middlewares/auth";
import isAdmin from "../middlewares/isAdmin";

const router = Router();

router.get("/borrow/:borrowedBookId", auth, isAdmin, getBorrowInvoice);

router.get("/payment/:borrowedBookId", auth, isAdmin, getPaymentInvoice);

router.get("/return/:borrowedBookId", auth, isAdmin, getReturnInvoice);

export default router;
