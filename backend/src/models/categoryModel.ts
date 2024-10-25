import { Schema, model } from "mongoose";

import { CategoryType } from "@src/types/category";

export interface CategorySchemaType extends CategoryType {
  createdAt?: Date;
  updatedAt?: Date;
}

const categorySchema = new Schema<CategorySchemaType>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default model<CategorySchemaType>("Category", categorySchema);
