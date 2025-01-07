import express from "express";
import {
  addBook,
  deleteBook,
  editBook,
  searchBooks,
  getBookDetailsByID,
  getBookByTitle,
  getBookByISBN,
} from "../controllers/bookController";
import { auth } from "../middlewares/auth";
import isAdmin from "../middlewares/isAdmin";

const router = express.Router();

router.post("/add", auth, isAdmin, addBook);
router.delete("/delete/:id", auth, isAdmin, deleteBook);
router.post("/edit", auth, isAdmin, editBook);

router.get("/title/:title", auth, getBookByTitle);
router.get("/title", auth, getBookByTitle);
router.post("/title", auth, getBookByTitle);

router.get("/isbn/:isbn", auth, getBookByISBN);
router.get("/isbn", auth, getBookByISBN);
router.post("/isbn", auth, getBookByISBN);

router.get("/id/:id", auth, getBookDetailsByID);
router.get("/id", auth, getBookDetailsByID);
router.post("/id", auth, getBookDetailsByID);

router.get("/search", searchBooks);
router.get("/search/:author?/:category?", searchBooks);
router.post("/search", searchBooks);

export default router;
