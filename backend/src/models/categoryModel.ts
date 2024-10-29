import { Schema, Types, model } from "mongoose";

import { CategoryType } from "@src/types/category";

export interface CategorySchemaType extends CategoryType {
  authorId?: Types.ObjectId;
  postId?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const categorySchema = new Schema<CategorySchemaType>(
  {
    name: { type: String, required: true, unique: true },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: false },
  },
  { timestamps: true }
);

export default model<CategorySchemaType>("Category", categorySchema);
