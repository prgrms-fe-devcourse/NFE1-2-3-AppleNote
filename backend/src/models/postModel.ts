import { Schema, Types, model, Document } from "mongoose";

import { CategorySchemaType } from "./categoryModel";
import { Images } from "@src/types";

export interface PostSchemaType {
  temp: boolean;
  title: string;
  content: string;
  images: string[];
  authorId: Types.ObjectId;
  categories: CategorySchemaType;
  createdAt: Date;
  updatedAt: Date;
}

export type FormDataImages = {
  files: Images | undefined;
  urls: string | string[] | undefined;
};

export type FormDataPost = Omit<PostSchemaType, "images"> & {
  images: FormDataImages;
  deleteImages?: "true";
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type PostDocument = Document<unknown, {}, PostSchemaType> &
  PostSchemaType & {
    _id: Types.ObjectId;
  } & {
    __v?: number;
  };

const postSchema = new Schema<PostSchemaType>(
  {
    temp: { type: Boolean, default: false },
    title: { type: String, required: true },
    content: { type: String, required: true },
    images: { type: [String], default: [] },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    categories: { type: Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

export default model<PostSchemaType>("Post", postSchema);
