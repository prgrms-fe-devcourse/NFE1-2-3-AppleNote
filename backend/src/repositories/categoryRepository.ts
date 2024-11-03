import mongoose from "mongoose";

import Category from "@src/models/categoryModel";
import Post, { PostSchemaType } from "@src/models/postModel";
import { PostPayload } from "./postRepository";

// 공통 타입 정의
type Timestamp = { createdAt: Date; updatedAt: Date };

// 인자에 사용될 타입 정의
type CreateArg = { userId: string; name: string };
type FindAllArg = { userId: string };
type UpdateArg = { categoryId: string; name: string };
type DeleteArg = { categoryId: string; userId: string };
type FindCategoryPostsArg = { categoryId: string; userId: string };

// 반환 타입 정의
export interface CategoryPayload extends Timestamp {
  name: string;
  categoryId: string;
}

export interface CategoryPayloadWithPosts extends Timestamp {
  name: string;
  categoryId: string;
  posts: PostPayload[];
}

type CreateCategoryResult = {
  isCategoryExist: boolean;
  data: CategoryPayload | null;
};

type FindAllCategoriesResult = CategoryPayload[];

type UpdateCategoryResult = {
  isUpdatedCategory: boolean;
  data: CategoryPayload | null;
};

type DeleteCategoryResult = {
  isExistCategory: boolean;
  isDeleted: boolean;
};

type FindCategoryPostsResult = CategoryPayloadWithPosts | null;

// ICategoryRepository 인터페이스
export interface ICategoryRepository {
  create(arg: CreateArg): Promise<CreateCategoryResult>;
  findAll(arg: FindAllArg): Promise<FindAllCategoriesResult>;
  update(arg: UpdateArg): Promise<UpdateCategoryResult>;
  delete(arg: DeleteArg): Promise<DeleteCategoryResult>;
  findCategoryPosts(arg: FindCategoryPostsArg): Promise<FindCategoryPostsResult>;
}

// MongoCategoryRepository 클래스
export class MongoCategoryRepository implements ICategoryRepository {
  async create({ name, userId }: CreateArg): Promise<CreateCategoryResult> {
    const state: CreateCategoryResult = {
      isCategoryExist: true,
      data: null,
    };

    const categoryExist = await Category.findOne({ name, authorId: userId });

    if (categoryExist) {
      return state;
    }

    const categoryData = new Category({
      authorId: userId,
      name,
    });

    const category = await categoryData.save();

    return {
      isCategoryExist: false,
      data: {
        name: category.name,
        categoryId: category._id.toString(),
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      },
    };
  }

  async findAll({ userId }: FindAllArg): Promise<FindAllCategoriesResult> {
    const categories = await Category.find({ authorId: userId }).lean();

    return categories.map((category) => ({
      categoryId: category._id.toString(),
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    }));
  }

  async update({ categoryId, name }: UpdateArg): Promise<UpdateCategoryResult> {
    const state: UpdateCategoryResult = {
      isUpdatedCategory: false,
      data: null,
    };

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCategory) {
      return state;
    }

    return {
      isUpdatedCategory: true,
      data: {
        name: updatedCategory.name,
        categoryId: updatedCategory._id.toString(),
        createdAt: updatedCategory.createdAt,
        updatedAt: updatedCategory.updatedAt,
      },
    };
  }

  async delete({ categoryId, userId }: DeleteArg): Promise<DeleteCategoryResult> {
    const state: DeleteCategoryResult = {
      isExistCategory: false,
      isDeleted: false,
    };

    const session = await mongoose.startSession();

    session.startTransaction();

    try {
      const category = await Category.findOne({ _id: categoryId, authorId: userId }).session(
        session
      );

      // 카테고리 존재여부 검증
      if (!category) {
        return state;
      }

      state.isExistCategory = true;
      const postIds = category.posts;

      if (postIds && postIds.length > 0) {
        // 포스트에서 해당 카테고리 ID 제거
        await Post.updateMany(
          { _id: { $in: postIds }, authorId: userId }, // 포스트 ID 및 작성자 ID를 기준으로
          { $pull: { categories: categoryId } }, // 배열에서 categoryId 제거
          { session }
        );

        // 카테고리에서 포스트 ID 제거
        await Category.updateMany(
          { _id: categoryId, authorId: userId }, // 카테고리 ID 및 작성자 ID를 기준으로
          { $pull: { posts: { $in: postIds } } }, // posts 배열에서 postIds 중 하나라도 일치하는 경우 제거
          { session }
        );
      }

      const deletedCategory = await Category.findOneAndDelete(
        {
          _id: categoryId,
          authorId: userId,
        },
        { session }
      );

      if (!deletedCategory) {
        return state;
      }

      state.isDeleted = true;
      await session.commitTransaction();

      return { ...state };
    } catch (error) {
      await session.abortTransaction();

      // 예외 던지기
      throw error;
    } finally {
      await session.endSession();
    }
  }

  async findCategoryPosts({
    categoryId,
    userId,
  }: FindCategoryPostsArg): Promise<FindCategoryPostsResult> {
    const category = await Category.findOne({ _id: categoryId, authorId: userId })
      .populate<{
        posts: PostSchemaType[];
      }>({
        path: "posts",
        match: { temp: false },
      })
      .lean();

    if (!category) {
      return null;
    }

    return {
      categoryId: category._id.toString(),
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
      posts: category.posts.map((post) => ({
        postId: post._id.toString(),
        title: post.title,
        content: post.content,
        images: post.images,
        authorId: post.authorId.toString(),
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      })),
    };
  }
}
