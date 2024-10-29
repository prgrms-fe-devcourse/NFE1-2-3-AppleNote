import { Types } from "mongoose";

import Category, { CategorySchemaType } from "@src/models/categoryModel";
import { ServiceError } from "@src/utils/Error";
import { validators } from "@src/utils/validators";
import { IUserWithId } from "@src/models/userModel";

export interface ICategoryService {
  createCategory(arg: CreateCategoryArg): Promise<CreateCategoryReturn>;
  getCategories(arg: GetCategoriesArg): Promise<GetCategoryReturn>;
  updateCategory(arg: UpdateCategoryArg): Promise<UpdateCategoryReturn>;
  deleteCategory(arg: DeleteCategoryArg): Promise<void>;
}

type RequestUser = IUserWithId | undefined;
type RequestData = Partial<CategorySchemaType>;

type GetCategoriesArg = {
  user: RequestUser;
};
type CreateCategoryArg = {
  data: RequestData;
  user: RequestUser;
};
type UpdateCategoryArg = CreateCategoryArg & { categoryId: string };
type DeleteCategoryArg = GetCategoriesArg & { categoryId: string };

type GetCategoryReturn = CategorySchemaType[];
type UpdateCategoryReturn = CategorySchemaType & { categoryId: Types.ObjectId };
type CreateCategoryReturn = CategorySchemaType & { categoryId: Types.ObjectId };

export class CategoryService implements ICategoryService {
  async createCategory({ data, user }: CreateCategoryArg): Promise<CreateCategoryReturn> {
    // 필드검증
    if (!validators.keys(data, ["name"])) {
      throw new ServiceError("Invalid request field.", 422);
    }

    // 유저정보검증
    if (!validators.checkRequestUser(user)) {
      throw new ServiceError("The request does not have valid user information.", 403);
    }

    // 카테고리 중복검증
    const categoryExist = await Category.findOne({ name: data.name, authorId: user.userId });

    if (categoryExist) {
      throw new ServiceError("Category already exists", 409);
    }

    const categoryData = new Category({
      authorId: user.userId,
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

  async getCategories({ user }: GetCategoriesArg): Promise<GetCategoryReturn> {
    // 유저정보검증
    if (!validators.checkRequestUser(user)) {
      throw new ServiceError("The request does not have valid user information.", 403);
    }

    const categories = await Category.find({ authorId: user.userId }).lean();
    const mappedPosts = categories.map((category) => ({
      categoryId: category._id,
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    }));

    return mappedPosts;
  }

  async updateCategory({
    user,
    data,
    categoryId,
  }: UpdateCategoryArg): Promise<UpdateCategoryReturn> {
    // categoryId 검증
    if (!validators.isObjectId(categoryId)) {
      throw new ServiceError("Invalid categoryId", 404);
    }

    // 유저정보검증
    if (!validators.checkRequestUser(user)) {
      throw new ServiceError("The request does not have valid user information.", 403);
    }

    // 필드검증
    if (!validators.keys(data, ["name"])) {
      throw new ServiceError("Invalid request field.", 422);
    }

    const updatedCategory = await Category.findByIdAndUpdate(categoryId, data, {
      new: true,
      runValidators: true,
    }).catch(() => {
      throw new ServiceError("Failed to update category item", 404);
    });

    // 카테고리 검증
    if (!updatedCategory) {
      throw new ServiceError("Failed to update category item", 404);
    }

    return {
      name: updatedCategory.name,
      categoryId: updatedCategory._id,
      createdAt: updatedCategory.createdAt,
      updatedAt: updatedCategory.updatedAt,
    };
  }

  async deleteCategory({ user, categoryId }: DeleteCategoryArg): Promise<void> {
    // categoryId 검증
    if (!validators.isObjectId(categoryId)) {
      throw new ServiceError("Invalid categoryId", 404);
    }

    // 유저정보검증
    if (!validators.checkRequestUser(user)) {
      throw new ServiceError("The request does not have valid user information.", 403);
    }

    const deletedCategory = await Category.findOneAndDelete({
      _id: categoryId,
      authorId: user.userId,
    });

    // 포스트 검증
    if (!deletedCategory) {
      throw new ServiceError("Failed to delete category item", 404);
    }
  }
}
