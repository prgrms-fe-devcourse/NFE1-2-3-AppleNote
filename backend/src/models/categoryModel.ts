import { Schema, Types, model } from "mongoose";

import { PostSchemaType } from "./postModel";

export interface CategorySchemaType {
  _id: Types.ObjectId;
  name: string;
  authorId: Types.ObjectId;
  posts: Omit<PostSchemaType, "categories" | "temp">[];
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<CategorySchemaType>(
  {
    name: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post", default: [] }],
  },
  { timestamps: true }
);

export default model<CategorySchemaType>("Category", categorySchema);
