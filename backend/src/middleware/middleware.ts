import { IUserWithId } from "@src/models/userModel";
import { createErrorResponse } from "@src/utils/createError";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // Authorization 헤더가 없을 경우
  if (!req.headers.authorization) {
    return res.status(401).json(createErrorResponse(401, "Access denied, no token provided."));
  }

  const token = req.headers.authorization.split(" ")[1]; // token 추출
  const secret = process.env.JWT_SECRET;

  // 환경변수가 존재하는지 확인
  if (!secret) {
    return res
      .status(500)
      .json(createErrorResponse(500, "Internal server error: JWT secret is not defined."));
  }

  // JWT 검증
  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      return res.status(401).json(createErrorResponse(401, "Invalid token"));
    }
    req.user = decoded as IUserWithId;
    next();

    return;
  });

  return;
};
