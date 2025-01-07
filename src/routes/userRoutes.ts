import { Router } from "express";
const router = Router();
import { login, signup } from "../controllers/authController";
import {
  sendotp,
  verifyEmail,
} from "../controllers/emailVerificationController";
import { validate } from "../middlewares/validate";
import { userSchema, userLoginSchema } from "../validation/user.validation";
import { auth } from "../middlewares/auth";

router.post("/signup", validate(userSchema), signup);

router.post("/login", validate(userLoginSchema), login);

router.post("/sendOtp", auth, sendotp);

router.post("/verifyEmail", auth, verifyEmail);

export default router;
