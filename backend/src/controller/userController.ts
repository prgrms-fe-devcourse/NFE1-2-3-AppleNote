import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserSchemaType } from "@src/types";
import { Request, Response } from "express";
import { createErrorResponse } from "@src/utils/createError";
import { IUserService } from "@src/service/userService";
import { IUserWithId } from "@src/models/userModel";

export class UserController {
  constructor(private userService: IUserService) {}

  // 회원가입
  async create(req: Request, res: Response) {
    try {
      const userData: UserSchemaType = req.body;

      // 비밀번호 해시화
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const newUser = await this.userService.createUser({
        ...userData,
        password: hashedPassword,
      });

      // JWT 토큰 발급
      const token = jwt.sign(
        { name: newUser.name, email: newUser.email, userId: newUser.userId },
        process.env.JWT_SECRET as string,
        { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
      );
      const responsePayload = {
        accessToken: token,
        userId: newUser.userId,
        name: newUser.name,
        email: newUser.email,
        bannerImage: newUser.bannerImage || null,
        profileImage: newUser.profileImage || null,
      };

      return res.status(200).json({
        statusCode: 200,
        payload: responsePayload,
      });
    } catch (error) {
      return res.status(500).json(createErrorResponse(500, `Signup failed: ${error}`));
    }
  }
  // 로그인
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const user = (await this.userService.getUserByEmail(email)) as IUserWithId | null;

      if (!user || !user.password) {
        return res.status(404).json({ message: "User not found" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = jwt.sign(
        { name: user.name, email: user.email, userId: user.userId },
        process.env.JWT_SECRET as string,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      const responsePayload = {
        accessToken: token,
        userId: user.userId,
        name: user.name,
        email: user.email,
        bannerImage: user.bannerImage || null,
        profileImage: user.profileImage || null,
      };

      return res.status(200).json({
        statusCode: 200,
        payload: responsePayload,
      });
    } catch (error) {
      return res.status(500).json(createErrorResponse(500, `Login failed: ${error}`));
    }
  }

  // 전체 사용자 조회
  async read(_req: Request, res: Response) {
    try {
      const users = await this.userService.getUsers();

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }

  // 나의 정보 조회
  async readMine(req: Request, res: Response) {
    try {
      const user = req.body as IUserWithId | undefined;

      if (!user) {
        return res.status(401).json({
          statusCode: 401,
          message: "User not found.",
        });
      }

      const responsePayload = {
        accessToken: req.headers.authorization?.split(" ")[1],
        userId: user.userId,
        name: user.name,
        email: user.email,
        bannerImage: user.bannerImage || null,
        profileImage: user.profileImage || null,
      };

      return res.status(200).json({
        statusCode: 200,
        payload: responsePayload,
      });
    } catch (error) {
      return res.status(500).json(createErrorResponse(500, `User read failed: ${error}`));
    }
  }

  async update(req: Request, res: Response) {
    const _id = req.params.id;
    const updateData = req.body;

    try {
      const updatedUser = await this.userService.updateUser(_id, updateData);

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ message: "Updated successfully", payload: updatedUser });
    } catch (error) {
      return res.status(500).json(createErrorResponse(500, `Update failed: ${error}`));
    }
  }

  async delete(req: Request, res: Response) {
    const _id = req.params.id;

    try {
      const isDeleted = await this.userService.deleteUser(_id);

      if (!isDeleted) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
      return res.status(500).json(createErrorResponse(500, `Delete failed: ${error}`));
    }
  }
}
