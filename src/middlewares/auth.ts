import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

interface DecodedToken {
  email: string;
  id: string;
  role: string;
}

dotenv.config({ path: `${__dirname}/../../.env` });

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const secret: string =
    (req.headers.role as string) === "ADMIN"
      ? process.env.JWT_SECRET_ADMIN || "default_admin_secret"
      : process.env.JWT_SECRET_MEMBER || "default_member_secret";

  try {
    const token: string | undefined =
      req.body.token || (req.headers.token as string) || req.cookies?.token;

    if (!token) {
      res.status(401).json({ success: false, message: `Token Missing` });
      return;
    }
    try {
      const decode = jwt.verify(token, secret) as DecodedToken;

      req.user = decode;
    } catch (error) {
      res.status(401).json({ success: false, message: "token is invalid" });
      return;
    }

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: `Something Went Wrong While Validating the Token`,
    });
    return;
  }
};
