import express from "express";
import {
  addBook,
  deleteBook,
  editBook,
  searchBooks,
  getBookDetailsByID,
  getBookByTitle,
  getBookByISBN,
  allBooks,
} from "../controllers/bookController";
import { auth } from "../middlewares/auth";
import isAdmin from "../middlewares/isAdmin";
import { validate } from "../middlewares/validate";
import { bookValidationSchema } from "../validation/book.validation";

const router = express.Router();

router.post("/add", auth, isAdmin, validate(bookValidationSchema), addBook);
router.delete("/delete/:id", auth, isAdmin, deleteBook);
router.post("/edit", auth, isAdmin, validate(bookValidationSchema), editBook);

router.get("/title/:title", auth, getBookByTitle);
router.get("/title", auth, getBookByTitle);
router.post("/title", auth, getBookByTitle);

router.get("/isbn/:isbn", auth, getBookByISBN);
router.get("/isbn", auth, getBookByISBN);
router.post("/isbn", auth, getBookByISBN);

router.get("/id/:id", auth, getBookDetailsByID);
router.get("/id", auth, getBookDetailsByID);
router.post("/id", auth, getBookDetailsByID);

router.get("/search", auth, searchBooks);
router.get("/search/:author?/:category?", auth, searchBooks);
router.post("/search", auth, searchBooks);

router.get("/", auth, allBooks);

export default router;
