import { ServiceError } from "@src/utils/Error";
import { validators } from "@src/utils/validators";
import { IUserWithId } from "@src/models/userModel";
import {
  CategoryPayload,
  CategoryPayloadWithPosts,
  ICategoryRepository,
} from "@src/repositories/categoryRepository";
import { PostPayload } from "@src/repositories/postRepository";

export interface ICategoryService {
  createCategory(arg: CreateCategoryArg): Promise<CategoryPayload>;
  getCategories(arg: GetCategoriesArg): Promise<CategoryPayload[]>;
  updateCategory(arg: UpdateCategoryArg): Promise<CategoryPayload>;
  deleteCategory(arg: DeleteCategoryArg): Promise<void>;
  getCategoryWithPosts(
    arg: GetCategoryWithPostsArg
  ): Promise<CategoryPayload & { posts: PostPayload[] }>;
}

// 재사용 가능한 기본 타입
type WithCategoryId = { categoryId: string };
type WithUser = { user: IUserWithId | undefined };
type WithNameData = { data: { name?: string } };

// 요청 인자 타입
type GetCategoriesArg = WithUser;
type CreateCategoryArg = WithUser & WithNameData;
type UpdateCategoryArg = CreateCategoryArg & WithCategoryId;
type DeleteCategoryArg = GetCategoriesArg & WithCategoryId;
type GetCategoryWithPostsArg = GetCategoriesArg & WithCategoryId;

// 반환 타입
type GetCategoryReturn = CategoryPayload[];
type CreateCategoryReturn = CategoryPayload;
type UpdateCategoryReturn = CategoryPayload;
type DeleteCategoryReturn = void;
type GetCategoryWithPostsReturn = CategoryPayloadWithPosts;

export class CategoryService implements ICategoryService {
  constructor(private categoryRepository: ICategoryRepository) {}

  async createCategory({ data, user }: CreateCategoryArg): Promise<CreateCategoryReturn> {
    // 필드검증
    if (!validators.keys(data, ["name"])) {
      throw new ServiceError("Invalid request field.", 422);
    }

    // 필드값 검증
    if (!validators.values(data, ["name"]) || data.name.length <= 0) {
      throw new ServiceError("Invalid request field.", 422);
    }

    // 유저정보검증
    if (!validators.checkRequestUser(user)) {
      throw new ServiceError("The request does not have valid user information.", 403);
    }

    const payload = await this.categoryRepository.create({ name: data.name, userId: user.userId });

    // 카테고리 중복 검증
    if (payload.isCategoryExist) {
      throw new ServiceError("Category already exists", 409);
    }

    // 카테고리 생성 검증
    if (!payload.data) {
      throw new ServiceError("Failed to create category item", 500);
    }

    return payload.data;
  }

  async getCategories({ user }: GetCategoriesArg): Promise<GetCategoryReturn> {
    // 유저정보검증
    if (!validators.checkRequestUser(user)) {
      throw new ServiceError("The request does not have valid user information.", 403);
    }

    const payload = await this.categoryRepository.findAll({ userId: user.userId });

    return payload;
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

    // 필드값 검증
    if (!validators.values(data, ["name"])) {
      throw new ServiceError("Invalid request field.", 422);
    }

    const payload = await this.categoryRepository.update({ categoryId, name: data.name });

    // 카테고리 검증
    if (!payload.isUpdatedCategory || !payload.data) {
      throw new ServiceError("Failed to update category item", 404);
    }

    return payload.data;
  }

  async deleteCategory({ user, categoryId }: DeleteCategoryArg): Promise<DeleteCategoryReturn> {
    // categoryId 검증
    if (!validators.isObjectId(categoryId)) {
      throw new ServiceError("Invalid categoryId", 404);
    }

    // 유저정보검증
    if (!validators.checkRequestUser(user)) {
      throw new ServiceError("The request does not have valid user information.", 403);
    }

    const state = await this.categoryRepository.delete({ categoryId, userId: user.userId });

    // 카테고리 존재여부 검증
    if (!state.isExistCategory) {
      throw new ServiceError("Invalid category ID.", 404);
    }

    // 카테고리 삭제 검증
    if (!state.isDeleted) {
      throw new ServiceError("Failed to delete the category.", 404);
    }
  }

  async getCategoryWithPosts({
    categoryId,
    user,
  }: GetCategoryWithPostsArg): Promise<GetCategoryWithPostsReturn> {
    // categoryId 검증
    if (!validators.isObjectId(categoryId)) {
      throw new ServiceError("Invalid categoryId", 404);
    }

    // 유저정보검증
    if (!validators.checkRequestUser(user)) {
      throw new ServiceError("The request does not have valid user information.", 403);
    }

    const payload = await this.categoryRepository.findCategoryPosts({
      categoryId,
      userId: user.userId,
    });

    // 카테고리 존재여부 검증
    if (!payload) {
      throw new ServiceError("Invalid category ID.", 404);
    }

    return payload;
  }
}
