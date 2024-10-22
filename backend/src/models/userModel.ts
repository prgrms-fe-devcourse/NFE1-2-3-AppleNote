import mongoose from "mongoose";

export interface IUser {
  name: string;
  password: string;
  address: string;
  description: string;
  email: string;
  bannerImage?: string;
  profileImage?: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
  bannerImage: { type: String, default: "" },
  profileImage: { type: String, default: "" },
});

export default mongoose.model("users", userSchema);
