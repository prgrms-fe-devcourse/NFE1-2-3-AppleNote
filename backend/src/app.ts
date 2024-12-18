import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import logger from "morgan";
import cookieParser from "cookie-parser";
import createError, { HttpError } from "http-errors";
import rateLimit from "express-rate-limit";
import favicon from "serve-favicon";

import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import postRoutes from "./routes/postRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import { verifyToken } from "./middleware";
import { createErrorResponse } from "./utils/createError";

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  rateLimit({
    windowMs: 5 * 60 * 1000, // 5분 간격
    max: 500, // 5분 동안 최대 500개의 요청
    message: createErrorResponse(429, "Too many requests, please try again later."),
  })
);

app.get("/", (_req, res) => {
  res.json({
    message: "Welcome to Apple_Note Server!",
    "sample-api": "GET /users",
  });
});

app.use("/users", verifyToken, userRoutes);
app.use("/auth", authRoutes);
app.use("/posts", verifyToken, postRoutes);
app.use("/categories", verifyToken, categoryRoutes);

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});

app.use((err: HttpError, req: Request, res: Response) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

export default app;
