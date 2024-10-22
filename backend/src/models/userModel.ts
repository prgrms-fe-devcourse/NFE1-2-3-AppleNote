import mongoose from "mongoose";

export interface IUser {
  name: string;
  password: string;
  address: string;
  description: string;
  email: string;
  isCompleted?: boolean;
  _id: string;
  bannerImage?: string;
  profileImage?: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: String,
  password: String,
  address: String,
  description: String,
  email: String,
  isCompleted: Boolean,
  bannerImage: String,
  profileImage: String,
});

export default mongoose.model("users", userSchema);
