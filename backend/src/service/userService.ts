import User, { IUser } from "@src/models/userModel";
import { UserSchemaType } from "@src/types";

export interface IUserWithId extends Partial<IUser> {
  userId: string;
}
export interface IUserService {
  createUser(data: UserSchemaType): Promise<IUserWithId>;
  getUsers(): Promise<IUser[]>;
  getUserByEmail(email: string): Promise<IUserWithId | null>;
  updateUser(userId: string, data: UserSchemaType): Promise<IUser | null>;
  deleteUser(userId: string): Promise<boolean>;
}

export class UserService implements IUserService {
  async createUser(data: UserSchemaType): Promise<IUserWithId> {
    const userExist = await User.findOne({ email: data.email });

    if (userExist) {
      throw new Error("User already exists");
    }

    const userData = new User(data);
    const savedUser = await userData.save();

    const mappedUser: IUserWithId = {
      userId: savedUser._id.toString(),
      name: savedUser.name,
      email: savedUser.email,
      description: savedUser.description,
      bannerImage: savedUser.bannerImage || null,
      profileImage: savedUser.profileImage || null,
    };

    return mappedUser;
  }

  async getUsers(): Promise<IUser[]> {
    return await User.find();
  }

  async getUserByEmail(email: string): Promise<IUserWithId | null> {
    const user = await User.findOne({ email }).lean(); // 이메일로 사용자 검색

    if (!user) {
      return null;
    }

    const mappedUser: IUserWithId = {
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      description: user.description,
      bannerImage: user.bannerImage || null,
      profileImage: user.profileImage || null,
    };

    return mappedUser;
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
