import { Schema, Types, model } from "mongoose";

import { CategorySchemaType } from "./categoryModel";
import { Images } from "@src/types";

export interface PostSchemaType {
  title: string;
  content: string;
  images: string[];
  authorId: Types.ObjectId;
  categories: CategorySchemaType;
  createdAt: Date;
  updatedAt: Date;
}

export type FormDataPost = Omit<PostSchemaType, "images"> & {
  images: Images;
};

const postSchema = new Schema<PostSchemaType>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    images: { type: [String], default: [] },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    categories: { type: Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

export default model<PostSchemaType>("Post", postSchema);
