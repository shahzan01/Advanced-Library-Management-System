import { Router } from "express";
import {
  BorrowBook,
  ReturnBook,
  PayFine,
  GetMostBorrowedBooks,
  getMonthlyUsageReport,
} from "../controllers/libraryController";
import { auth } from "../middlewares/auth";
import isAdmin from "../middlewares/isAdmin";
import { validate } from "../middlewares/validate";
import { borrowedBookSchema } from "../validation/borrowedBook.validation";
import { transactionSchema } from "../validation/transaction.validation";

const router = Router();

router.post("/borrow", auth, isAdmin, validate(borrowedBookSchema), BorrowBook);
router.post("/return", auth, isAdmin, ReturnBook);
router.post("/pay-fine", auth, isAdmin, validate(transactionSchema), PayFine);
router.get("/stats/most-borrowed", auth, isAdmin, GetMostBorrowedBooks);
router.get("/stats/monthly-usage", auth, isAdmin, getMonthlyUsageReport);
export default router;
