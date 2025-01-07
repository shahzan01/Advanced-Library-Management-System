import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { errorHandler } from "./middleware"; // Assuming errorHandler is implemented elsewhere

export const validate = (
  schema: ZodSchema,
  source: "body" | "query" | "params" = "body"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      res.status(400).json({
        errors: result.error.errors.map((err) => ({
          path: err.path,
          message: err.message,
        })),
      });
      return;
    }

    next();
  };
};
