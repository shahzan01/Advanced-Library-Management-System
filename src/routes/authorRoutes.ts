import express from "express";
import { addAuthor, getAuthors } from "./../controllers/catalogController";
import { authorSchema } from "../validation/author.validation";
import { validate } from "../middlewares/validate";
import { auth } from "../middlewares/auth";
import isAdmin from "../middlewares/isAdmin";

const router = express.Router();

router.post("/add", auth, isAdmin, validate(authorSchema), addAuthor);
router.get("/", auth, getAuthors);

export default router;
