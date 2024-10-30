import { Schema, Types, model } from "mongoose";

import { PostSchemaType } from "./postModel";

export interface CategorySchemaType {
  name: string;
  authorId?: Types.ObjectId;
  posts?: PostSchemaType[];
  createdAt?: Date;
  updatedAt?: Date;
}

const categorySchema = new Schema<CategorySchemaType>(
  {
    name: { type: String, required: true, unique: false },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

export default model<CategorySchemaType>("Category", categorySchema);
