import { Schema, Types, model } from "mongoose";

import { PostType } from "@src/types/post";

export interface PostSchemaType extends PostType {
  authorId?: Types.ObjectId;
}

const postSchema = new Schema<PostSchemaType>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    images: { type: [String], default: [] },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default model<PostSchemaType>("Post", postSchema);
