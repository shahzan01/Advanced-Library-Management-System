import express from "express";
import { calculateFine, payFineForBook } from "../controllers/fineController";

const router = express.Router();

router.get("/borrowed/:id/fine", calculateFine);
router.post("/borrowed/:id/pay-fine", payFineForBook);

export default router;
