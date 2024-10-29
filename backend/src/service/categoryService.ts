import { Types } from "mongoose";

import Category, { CategorySchemaType } from "@src/models/categoryModel";
import { ServiceError } from "@src/utils/Error";
import { validators } from "@src/utils/validators";
import { IUserWithId } from "@src/models/userModel";

export interface ICategoryService {
  createCategory(arg: CreateCategoryArg): Promise<CreateCategoryReturn>;
  getCategories(arg: getCategoriesArg): Promise<GetCategories>;
}

type RequestUser = IUserWithId | undefined;
type RequestData = Partial<CategorySchemaType>;

type getCategoriesArg = {
  user: RequestUser;
};
type CreateCategoryArg = {
  data: RequestData;
  user: RequestUser;
};

type GetCategories = CreateCategoryReturn[];
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
  async getCategories({ user }: getCategoriesArg): Promise<GetCategories> {
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
}
