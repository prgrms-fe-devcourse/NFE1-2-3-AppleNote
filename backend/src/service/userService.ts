import User, { IUser } from "@src/models/userModel";
import { UserSchemaType } from "@src/types";

export interface IUserService {
  createUser(data: UserSchemaType): Promise<IUser>;
  getUsers(): Promise<IUser[]>;
  updateUser(userId: string, data: UserSchemaType): Promise<IUser | null>;
  deleteUser(userId: string): Promise<boolean>;
}

export class UserService implements IUserService {
  async createUser(data: UserSchemaType): Promise<IUser> {
    const userExist = await User.findOne({ name: data.name });

    if (userExist) {
      throw new Error("User already exists");
    }
    const userData = new User(data);

    return await userData.save();
  }

  async getUsers(): Promise<IUser[]> {
    return await User.find();
  }

  async updateUser(userId: string, data: UserSchemaType): Promise<IUser | null> {
    return await User.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteUser(userId: string): Promise<boolean> {
    const user = await User.findById(userId);

    if (!user) {
      return false;
    }

    await User.findByIdAndDelete(userId);

    return true;
  }
}
