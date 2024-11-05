import User, { IUser, IUserWithId } from "@src/models/userModel";
import { UserSchemaType } from "@src/types";
import { IFileService } from "./fileService";

export interface IUserService {
  createUser(data: UserSchemaType): Promise<IUserWithId>;
  getUsers(): Promise<IUser[]>;
  getUserById(id: string): Promise<IUser | null>;
  getUserByEmail(email: string): Promise<IUserWithId | null>;
  updateUser(userId: string, data: UserSchemaType): Promise<IUser | null>;
  deleteUser(userId: string): Promise<boolean>;
  getUrl(files: Express.Multer.File[]): Promise<string[]>;
}

export class UserService implements IUserService {
  constructor(private fileService: IFileService) {}
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

  async getUserById(id: string): Promise<IUser | null> {
    return await User.findById(id);
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
  async getUrl(files: Express.Multer.File[]): Promise<string[]> {
    const uploadedImages = await this.fileService.uploadImageList(files); // 업로드된 이미지 리스트를 기다림

    return uploadedImages; // 첫 번째 이미지 URL을 반환
  }

  async updateUser(_id: string, data: Partial<UserSchemaType>): Promise<IUser | null> {
    const updateData: UserSchemaType = {
      name: data.name || "",
      email: data.email || "",
      description: data.description || "",
      password: data.password || "",
      profileImage: data.profileImage || "",
      bannerImage: data.bannerImage || "",
    };

    // MongoDB에서 업데이트 수행
    return await User.findByIdAndUpdate(_id, updateData, {
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
