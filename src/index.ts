import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { auth } from "./middlewares/auth";
import userRouter from "./routes/userRoutes";
import bookRoute from "./routes/bookRoutes";
dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "hello there" });
});

app.use(bookRoute);

app.use(userRouter);

app.listen(3000);
