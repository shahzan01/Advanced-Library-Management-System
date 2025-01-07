import { NextFunction, Request, Response } from "express";
import prisma from "../config/db";

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user?.role || req.user.role === "MEMBER") {
      res.status(401).json({
        success: false,
        message: "This is a Protected Route for Admin",
      });
      return;
    }
    next();
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `User Role Can't be Verified` });
    return;
  }
};
export default isAdmin;
