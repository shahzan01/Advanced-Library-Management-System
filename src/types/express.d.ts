import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      Role?: "ADMIN" | "MEMBER";
      user?: { email: string; id: string; role: string };
    }
  }
}
