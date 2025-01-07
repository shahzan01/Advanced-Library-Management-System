import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { auth } from "./middlewares/auth";
import userRouter from "./routes/userRoutes";
import bookRoute from "./routes/bookRoutes";
import categoryRoute from "./routes/categoriesRoutes";
import authorRoute from "./routes/authorRoutes";
import libraryRoutes from "./routes/lidraryRoutes";
import invoiceRoutes from "./routes/invoiceRoutes";
import { apiRateLimiter } from "./middlewares/rateLimiter";
import { scheduleReturnReminders } from "./utils/returnReminderScheduler";

dotenv.config();
scheduleReturnReminders();
const app = express();
app.use(express.json());
app.use(apiRateLimiter);
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "hello there" });
});

app.use("/api/v1/book", bookRoute);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/author", authorRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/library", libraryRoutes);
app.use("/api/v1/invoice", invoiceRoutes);

app.listen(3000);
