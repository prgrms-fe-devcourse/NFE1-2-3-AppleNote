import mongoose from "mongoose";

export interface IUser {
  name: string;
  address: string;
  description: string;
  email: string;
  isCompleted: boolean;
}

const userSchema = new mongoose.Schema<IUser>({
  name: String,
  address: String,
  description: String,
  email: String,
  isCompleted: Boolean,
});

export default mongoose.model("users", userSchema);
