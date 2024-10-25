import { Types } from "mongoose";

import Category, { CategorySchemaType } from "@src/models/categoryModel";
import { ServiceError } from "@src/utils/Error";
import { validators } from "@src/utils/validators";

export interface ICategoryService {
  createCategory(arg: CreateCategoryArg): Promise<CreateCategoryReturn>;
}

type RequestData = Partial<CategorySchemaType>;

type CreateCategoryArg = {
  data: RequestData;
};
type CreateCategoryReturn = CategorySchemaType & { categoryId: Types.ObjectId };

export class CategoryService implements ICategoryService {
  async createCategory({ data }: CreateCategoryArg): Promise<CreateCategoryReturn> {
    // 필드검증
    if (!validators.keys(data, ["name"])) {
      throw new ServiceError("Invalid request field.", 422);
    }

    // 카테고리 중복검증
    const categoryExist = await Category.findOne({ name: data.name });

    if (categoryExist) {
      throw new ServiceError("Category already exists", 409);
    }

    const categoryData = new Category({
      name: data.name,
    });
    const category = await categoryData.save();

    return {
      name: category.name,
      categoryId: category._id,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }
}
