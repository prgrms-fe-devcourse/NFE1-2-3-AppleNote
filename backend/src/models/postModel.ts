import { Schema, Types, model } from "mongoose";

import { PostType } from "@src/types/post";
export interface PostSchemaType extends PostType {
  authorId?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const postSchema = new Schema<PostSchemaType>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  images: { type: [String], default: [] },
  authorId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model<PostSchemaType>("Post", postSchema);
