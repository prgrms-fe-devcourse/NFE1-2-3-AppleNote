import User, { IUser } from "@src/models/userModel";
import { UserSchemaType } from "@src/types";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export interface IUserService {
  createUser(data: UserSchemaType): Promise<IUser>;
  getUsers(): Promise<IUser[]>;
  getUserByEmail(email: string): Promise<IUser | null>;
  updateUser(userId: string, data: UserSchemaType): Promise<IUser | null>;
  deleteUser(userId: string): Promise<boolean>;
}

export class UserService implements IUserService {
  async createUser(data: UserSchemaType): Promise<IUser> {
    const userExist = await User.findOne({ email: data.email });

    if (userExist) {
      throw new Error("User already exists");
    }
    const userData = new User(data);

    return await userData.save();
  }
  async loginUser(email: string, password: string) {
    const user = await this.getUserByEmail(email);

    // 비밀번호 검증
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid email or password");
    }

    // JWT 토큰 생성
    const token = jwt.sign(
      { name: user.name, email: user.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    return token;
  }
  async getUsers(): Promise<IUser[]> {
    return await User.find();
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email }); // 이메일로 사용자 검색
  }

  async updateUser(_id: string, data: UserSchemaType): Promise<IUser | null> {
    return await User.findByIdAndUpdate(_id, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteUser(_id: string): Promise<boolean> {
    const user = await User.findById(_id);

    if (!user) {
      return false;
    }

    await User.findByIdAndDelete(_id);

    return true;
  }
}
