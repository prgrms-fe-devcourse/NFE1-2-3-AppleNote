import { Schema, Types, model } from "mongoose";

import { CategorySchemaType } from "./categoryModel";
import { Images } from "@src/types";

export interface PostSchemaType {
  _id: Types.ObjectId;
  temp: boolean;
  title: string;
  content: string;
  images: string[];
  authorId: Types.ObjectId;
  categories: CategorySchemaType;
  createdAt: Date;
  updatedAt: Date;
}

type FormDataImages = {
  files: Images | undefined;
  urls: string | string[] | undefined;
};

export type FormDataPost = Omit<PostSchemaType, "images"> & {
  images: FormDataImages;
  deleteImages?: "true";
};

const postSchema = new Schema<PostSchemaType>(
  {
    temp: { type: Boolean, default: false },
    title: { type: String, required: true },
    content: { type: String, required: true },
    images: { type: [String], default: [] },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category", default: [] }],
  },
  { timestamps: true }
);

export default model<PostSchemaType>("Post", postSchema);
