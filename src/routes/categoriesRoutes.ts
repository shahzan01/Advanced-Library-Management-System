import express from "express";
import { addCategory, getCategories } from "./../controllers/catalogController";
import { auth } from "../middlewares/auth";
import isAdmin from "../middlewares/isAdmin";
import { validate } from "../middlewares/validate";
import { categorySchema } from "../validation/category.validation";

const router = express.Router();

router.post("/add", auth, isAdmin, validate(categorySchema), addCategory);
router.get("/", auth, getCategories);

export default router;
