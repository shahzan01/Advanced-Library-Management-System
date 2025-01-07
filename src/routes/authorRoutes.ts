import express from "express";
import { addAuthor, getAuthors } from "./../controllers/authorController";

const router = express.Router();

router.post("/add", addAuthor);
router.get("/", getAuthors);

export default router;
