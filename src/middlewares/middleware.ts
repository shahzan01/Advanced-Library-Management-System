import Express, { NextFunction, Request, Response } from "express";
const app = Express();

export const logRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.message || err);
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message || "Unknown error",
  });
};
