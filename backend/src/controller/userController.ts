import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserSchemaType } from "@src/types";
import { Request, Response } from "express";
import { createErrorResponse } from "@src/utils/createError";
import { IUserService } from "@src/service/userService";
import { IUserWithId } from "@src/models/userModel";

export class UserController {
  constructor(private userService: IUserService) {}

  async check(req: Request, res: Response) {
    try {
      const email = req.body.email;

      // 이메일이 제공되지 않은 경우
      if (!email) {
        return res.status(400).json(createErrorResponse(400, "No email was provided"));
      }

      // 이메일로 사용자 검색
      const userExist = await this.userService.getUserByEmail(email);

      if (userExist) {
        // 이메일이 이미 존재하는 경우
        return res.status(409).json(createErrorResponse(422, "Existing Email"));
      } else {
        // 이메일이 사용 가능할 경우
        return res.status(200).json({
          statusCode: 200,
          payload: "This email is available",
        });
      }
    } catch (error) {
      return res.status(500).json(createErrorResponse(500, `${error}`));
    }
  }
  // 회원가입
  async create(req: Request, res: Response) {
    try {
      const userData: UserSchemaType = req.body;

      //이메일 형식 검증
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(userData.email)) {
        return res.status(400).json(createErrorResponse(400, "Invalid email format"));
      }

      //비밀번호 형식 검증
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

      if (!passwordRegex.test(userData.password)) {
        return res.status(400).json(createErrorResponse(400, "Invalid password format"));
      }
      // 비밀번호 해시화
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const newUser = await this.userService.createUser({
        ...userData,
        password: hashedPassword,
      });

      // JWT 토큰 발급
      const token = jwt.sign(
        {
          name: newUser.name,
          email: newUser.email,
          userId: newUser.userId,
        },
        process.env.JWT_SECRET as string,
        { expiresIn: process.env.JWT_EXPIRES_IN }
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
      return res.status(500).json(createErrorResponse(500, `${error}`));
    }
  }
  // 로그인
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const user = (await this.userService.getUserByEmail(email)) as IUserWithId | null;

      if (!user || !user.password) {
        return res.status(404).json(createErrorResponse(404, "User not found"));
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
      return res.status(500).json(createErrorResponse(500, `${error}`));
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
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(400).json(createErrorResponse(400, "User ID is required"));
      }
      const user = await this.userService.getUserById(userId);

      if (!user) {
        return res.status(401).json(createErrorResponse(404, "User not found"));
      }

      const responsePayload = {
        accessToken: req.headers.authorization?.split(" ")[1],
        userId: userId,
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
      return res.status(500).json(createErrorResponse(500, `${error}`));
    }
  }
  // 이름 변경
  async updateName(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(400).json(createErrorResponse(400, "User ID is required"));
      }
      const user = await this.userService.getUserById(userId);

      if (!user) {
        return res.status(404).json(createErrorResponse(404, "User not found"));
      }
      const updateData: UserSchemaType = {
        name: name,
        email: user.email || "",
        description: user.description || "",
        password: user.password || "",
      };

      await this.userService.updateUser(userId, updateData);

      return res.status(200).json({
        statusCode: 200,
        payload: { isChange: true },
      });
    } catch (error) {
      return res.status(500).json(createErrorResponse(500, `${error}`));
    }
  }
  // 프로필이미지 변경
  async updateProfile(req: Request, res: Response) {
    try {
      const { profileImage } = req.body;
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(400).json(createErrorResponse(400, "User ID is required"));
      }
      const user = await this.userService.getUserById(userId);

      if (!user) {
        return res.status(404).json(createErrorResponse(404, "User not found"));
      }
      const updateData: UserSchemaType = {
        name: user.name || "",
        email: user.email || "",
        description: user.description || "",
        password: user.password || "",
        profileImage: profileImage,
      };

      await this.userService.updateUser(userId, updateData);

      return res.status(200).json({
        statusCode: 200,
        payload: { isChange: true },
      });
    } catch (error) {
      return res.status(500).json(createErrorResponse(500, `${error}`));
    }
  }
  //비밀번호 변경
  async updatePw(req: Request, res: Response) {
    try {
      const { oldPassword, newPassword } = req.body;

      const userId = req.user?.userId;

      if (!userId) {
        return res.status(400).json(createErrorResponse(400, "User ID is required"));
      }
      const user = await this.userService.getUserById(userId);

      // user가 정의되어 있고 비밀번호가 존재하는지 확인
      if (!user || !user.password || !(await bcrypt.compare(oldPassword, user.password))) {
        return res.status(404).json(createErrorResponse(404, "Password is not correct"));
      }

      // 새 비밀번호 해시화
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      const updateData: UserSchemaType = {
        name: user.name || "",
        email: user.email || "",
        description: user.description || "",
        password: hashedNewPassword,
      };

      // 비밀번호 업데이트
      await this.userService.updateUser(userId, updateData);

      return res.status(200).json({
        statusCode: 200,
        payload: { isChange: true },
      });
    } catch (error) {
      return res.status(500).json(createErrorResponse(500, `${error}`));
    }
  }

  // 회원탈퇴
  async delete(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;

      // userId가 undefined일 경우 400 Bad Request 응답
      if (!userId) {
        return res.status(400).json(createErrorResponse(400, "User ID is required"));
      }

      // 사용자 삭제 메서드 호출
      const isDeleted = await this.userService.deleteUser(userId);

      // 삭제가 성공했는지 확인
      if (!isDeleted) {
        return res.status(404).json(createErrorResponse(404, "User not found"));
      }

      return res.status(200).json({
        statusCode: 200,
        payload: { isRemove: true },
      });
    } catch (error) {
      return res.status(500).json(createErrorResponse(500, `${error}`));
    }
  }
}
