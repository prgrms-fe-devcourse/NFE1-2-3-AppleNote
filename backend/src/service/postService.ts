import mongoose, { Types } from "mongoose";

import Post, { FormDataPost, PostSchemaType } from "@src/models/postModel";
import User from "@src/models/userModel";
import Category from "@src/models/categoryModel";
import { ServiceError } from "@src/utils/Error";
import { validators } from "@src/utils/validators";
import { IUserWithId } from "@src/models/userModel";

export interface IPostService {
  createPost(arg: CreatePostArg): Promise<CreatePostReturn>;
  getPostList(arg: GetPostListArg): Promise<GetPostListReturn>;
  updatePost(arg: UpdatePostArg): Promise<UpdatePostReturn>;
  deletePost(arg: DeletePostArg): Promise<void>;
  addPostFromCategory(arg: AddCategoryArg): Promise<AddCategoryReturn>;
  deletePostFromCategory(arg: RemoveCategoryArg): Promise<RemoveCategoryReturn>;
  getPost(arg: GetPostArg): Promise<GetPostReturn>;
  searchPostList(arg: SearchPostListArg): Promise<SearchPostListReturn>;
}

// 재사용 가능한 기본 타입
type RequestUser = IUserWithId | undefined;
type RequestHeader = string | undefined;
type RequestData = Partial<FormDataPost>;
type WithPostId = { postId: string };
type WithUser = { user: RequestUser };
type WithCategories = { categories: string[] };
type PostWithoutId = Omit<PostSchemaType, "_id">;
type PostWithId = PostWithoutId & { postId: Types.ObjectId };

// 요청 인자 타입
type GetPostListArg = WithUser;
type CreatePostArg = WithUser & { header: RequestHeader; data: RequestData };
type UpdatePostArg = CreatePostArg & WithPostId;
type DeletePostArg = WithUser & WithPostId;
type AddCategoryArg = WithUser & WithPostId & { data: WithCategories };
type RemoveCategoryArg = WithUser & WithPostId & { data: WithCategories };
type GetPostArg = WithUser & WithPostId;
type SearchPostListArg = WithUser & { data: { query: string } };

// 반환 타입
type GetPostListReturn = Omit<PostWithId, "categories">[];
type CreatePostReturn = Omit<PostWithId, "categories">;
type UpdatePostReturn = Omit<PostWithId, "categories">;
type AddCategoryReturn = WithCategories;
type RemoveCategoryReturn = WithCategories;
type GetPostReturn = Omit<PostSchemaType, "categories"> & { postId: Types.ObjectId } & {
  categories: { name: string; categoryId: Types.ObjectId; createdAt: Date; updatedAt: Date }[];
};
type SearchPostListReturn = Omit<PostWithId, "categories">[];

export class PostService implements IPostService {
  // TODO: 이미지 URL 변환 작업하기
  // TODO: 카테고리 없는 경우도 고려하기
  async createPost({ header, data, user }: CreatePostArg): Promise<CreatePostReturn> {
    // 헤더검증
    if (!validators.checkContentType(header, "multipart/form-data")) {
      throw new ServiceError("The content-type is invalid.", 400);
    }

    // TODO: 올바르지 않은 필드 포함시 에러 발생시키기
    // 필드검증
    if (!validators.keys(data, ["title", "content", "images"])) {
      throw new ServiceError("Invalid request field.", 422);
    }

    // 유저정보검증
    if (!validators.checkRequestUser(user)) {
      throw new ServiceError("The request does not have valid user information.", 403);
    }

    // TODO: 카테고리 id 조인하기
    const postData = new Post({
      ...data,
      images: ["test.url"],
      authorId: user.userId,
    });

    const post = await postData.save();

    return {
      postId: post._id,
      title: post.title,
      content: post.content,
      images: post.images,
      authorId: post.authorId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  }

  // DONE: 사용자 구분하기 [V]
  // TODO: 카테고리 참조
  async getPostList({ user }: GetPostListArg): Promise<GetPostListReturn> {
    // 유저정보검증
    if (!validators.checkRequestUser(user)) {
      throw new ServiceError("The request does not have valid user information.", 403);
    }

    const postList = await Post.find({ authorId: user.userId })
      .populate<{
        categories: { _id: Types.ObjectId; name: string; createdAt: Date; updatedAt: Date };
      }>("categories")
      .lean();

    const mappedPosts = postList.map((post) => ({
      postId: post._id,
      title: post.title,
      content: post.content,
      images: post.images,
      authorId: post.authorId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      categories: post.categories
        ? [
            {
              name: post.categories.name,
              categoryId: post.categories._id,
              createdAt: post.categories.createdAt,
              updatedAt: post.categories.updatedAt,
            },
          ]
        : [],
    }));

    return mappedPosts;
  }

  // TODO: 포스트아이디와 사용자아이디 조인해서 가져오기
  async updatePost({ header, user, data, postId }: UpdatePostArg): Promise<UpdatePostReturn> {
    // postId 검증
    if (!validators.isObjectId(postId)) {
      throw new ServiceError("Invalid postId", 404);
    }

    // 헤더 타입 검증
    if (!validators.checkContentType(header, "multipart/form-data")) {
      throw new ServiceError("The content-type is invalid.", 400);
    }

    // 유저 필드 타입 검증
    if (!validators.checkRequestUser(user)) {
      throw new ServiceError("The request does not have valid user information.", 403);
    }

    const isExistUser = await User.exists({ email: user.email, _id: user.userId });

    // 사용자 존재여부 검증
    if (!isExistUser) {
      throw new ServiceError("There are no items with that userId.", 404);
    }

    const updatedPost = await Post.findOneAndUpdate(
      { authorId: user.userId, _id: postId },
      validators.cleanedValue(data),
      { new: true, runValidators: true }
    );

    // 포스트 업데이트 여부
    if (!updatedPost) {
      throw new ServiceError("Failed to update post item", 404);
    }

    return {
      postId: updatedPost._id,
      title: updatedPost.title,
      content: updatedPost.content,
      images: updatedPost.images,
      authorId: updatedPost.authorId,
      createdAt: updatedPost.createdAt,
      updatedAt: updatedPost.updatedAt,
    };
  }

  // DONE: 사용자 유저의 포스트만 삭제 가능하도록 구현하기 [V]
  async deletePost({ postId, user }: DeletePostArg): Promise<void> {
    // postId 검증
    if (!validators.isObjectId(postId)) {
      throw new ServiceError("Invalid postId", 404);
    }

    // 유저정보검증
    if (!validators.checkRequestUser(user)) {
      throw new ServiceError("The request does not have valid user information.", 403);
    }

    const session = await mongoose.startSession();

    session.startTransaction();

    try {
      const isExistPost = await Post.exists({ _id: postId, authorId: user.userId });

      // 포스트 검증
      if (!isExistPost) {
        throw new ServiceError("No posts with that postId were found.", 404);
      }

      // 포스트 삭제
      const deletedPost = await Post.deleteOne({ _id: postId, authorId: user.userId }, { session });

      if (deletedPost.deletedCount === 0) {
        throw new ServiceError("Failed to delete the post.", 404);
      }

      // 카테고리에서 포스트 ID 제거
      await Category.updateMany(
        { posts: postId, authorId: user.userId },
        { $pull: { posts: postId } },
        { session }
      );

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();

      // 예외 던지기
      throw error;
    } finally {
      await session.endSession();
    }
  }

  async addPostFromCategory({ data, user, postId }: AddCategoryArg): Promise<AddCategoryReturn> {
    // postId 검증
    if (!validators.isObjectId(postId)) {
      throw new ServiceError("Invalid postId", 404);
    }

    // 유저 필드 타입 검증
    if (!validators.checkRequestUser(user)) {
      throw new ServiceError("The request does not have valid user information.", 403);
    }

    // 필드 검증
    if (!validators.keys(data, ["categories"])) {
      throw new ServiceError("Invalid request field.", 422);
    }

    // 단일 카테고리 처리
    if ((!data.categories && !validators.isArray(data.categories)) || data.categories.length > 1) {
      throw new ServiceError("Invalid request field.", 422);
    }

    const categoryId = data.categories[0];
    const isExistPost = await Post.exists({ _id: postId, authorId: user.userId });

    // 포스트 존재여부 검증
    if (!isExistPost) {
      throw new ServiceError("There are no items with that postId.", 404);
    }

    const isExistCategory = await Category.exists({ _id: categoryId, authorId: user.userId });

    // 카테고리 존재여부 검증
    if (!isExistCategory) {
      throw new ServiceError("Invalid category ID.", 404);
    }

    // 포스트 카테고리 존재여부 검증
    const isExistCategoryByPost = await Category.findOne({ posts: postId, authorId: user.userId });

    if (isExistCategoryByPost) {
      throw new ServiceError("Category already exists", 409);
    }

    const session = await mongoose.startSession();

    session.startTransaction();

    try {
      // 카테고리 업데이트 (카테고리의 posts 배열에 포스트 ID 추가)
      const updatedCategory = await Category.findOneAndUpdate(
        { _id: categoryId, authorId: user.userId },
        { $addToSet: { posts: postId } },
        { new: true, runValidators: true, session }
      );

      // 포스트에 카테고리 ID 추가
      const updatedPost = await Post.findOneAndUpdate(
        { _id: postId, authorId: user.userId },
        { categories: categoryId }, // 포스트에 카테고리 ID 업데이트
        { new: true, runValidators: true, session }
      );

      if (!updatedCategory || !updatedPost) {
        throw new ServiceError("Failed to update item", 404);
      }

      await session.commitTransaction();

      return { categories: [categoryId] };
    } catch (error) {
      await session.abortTransaction();

      // 예외 던지기
      throw error;
    } finally {
      await session.endSession();
    }
  }

  async deletePostFromCategory({
    data,
    user,
    postId,
  }: RemoveCategoryArg): Promise<RemoveCategoryReturn> {
    // postId 검증
    if (!validators.isObjectId(postId)) {
      throw new ServiceError("Invalid postId", 404);
    }

    // 유저 필드 타입 검증
    if (!validators.checkRequestUser(user)) {
      throw new ServiceError("The request does not have valid user information.", 403);
    }

    // 필드 검증
    if (!validators.keys(data, ["categories"])) {
      throw new ServiceError("Invalid request field.", 422);
    }

    // 단일 카테고리 처리
    if ((!data.categories && !validators.isArray(data.categories)) || data.categories.length > 1) {
      throw new ServiceError("Invalid request field.", 422);
    }

    const categoryId = data.categories[0];
    const isExistPost = await Post.exists({ _id: postId, authorId: user.userId });

    // 포스트 존재여부 검증
    if (!isExistPost) {
      throw new ServiceError("There are no items with that postId.", 404);
    }

    const isExistCategory = await Category.exists({ _id: categoryId, authorId: user.userId });

    // 카테고리 존재여부 검증
    if (!isExistCategory) {
      throw new ServiceError("Invalid category ID.", 404);
    }

    // 포스트 카테고리 존재여부 검증
    const isExistCategoryByPost = await Category.findOne({ posts: postId, authorId: user.userId });

    if (!isExistCategoryByPost) {
      throw new ServiceError("No post information in the category", 404);
    }

    const session = await mongoose.startSession();

    session.startTransaction();

    try {
      // 카테고리에서 포스트 ID 제거
      const updatedCategory = await Category.findOneAndUpdate(
        { _id: categoryId, authorId: user.userId },
        { $pull: { posts: postId } }, // 카테고리의 posts 배열에서 포스트 ID 제거
        { new: true, session }
      );

      // 포스트에서 카테고리 ID 제거
      const updatedPost = await Post.findOneAndUpdate(
        { _id: postId, authorId: user.userId },
        { $unset: { categories: "" } }, // 포스트에서 categoryId 필드 제거
        { new: true, session }
      );

      if (!updatedCategory || !updatedPost) {
        throw new ServiceError("Failed to update item", 404);
      }

      await session.commitTransaction();

      return { categories: [categoryId] };
    } catch (error) {
      await session.abortTransaction();

      // 예외 던지기
      throw error;
    } finally {
      await session.endSession();
    }
  }

  async getPost({ postId, user }: GetPostArg): Promise<GetPostReturn> {
    // postId 검증
    if (!validators.isObjectId(postId)) {
      throw new ServiceError("Invalid postId", 404);
    }

    // 유저정보검증
    if (!validators.checkRequestUser(user)) {
      throw new ServiceError("The request does not have valid user information.", 403);
    }

    const post = await Post.findOne({ _id: postId, authorId: user.userId })
      .populate<{
        categories: { _id: Types.ObjectId; name: string; createdAt: Date; updatedAt: Date };
      }>("categories")
      .lean();

    if (!post) {
      throw new ServiceError("There are no items with that postId.", 404);
    }

    return {
      postId: post._id,
      title: post.title,
      content: post.content,
      images: post.images,
      authorId: post.authorId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      categories: post.categories
        ? [
            {
              name: post.categories.name,
              categoryId: post.categories._id,
              createdAt: post.categories.createdAt,
              updatedAt: post.categories.updatedAt,
            },
          ]
        : [],
    };
  }

  async searchPostList({ user, data }: SearchPostListArg): Promise<SearchPostListReturn> {
    // 유저 필드 타입 검증
    if (!validators.checkRequestUser(user)) {
      throw new ServiceError("The request does not have valid user information.", 403);
    }

    // 필드검증
    if (!validators.keys(data, ["query"])) {
      throw new ServiceError("Invalid request field.", 422);
    }

    const regexSearchResults = await Post.find({
      authorId: user.userId,
      $or: [
        { title: { $regex: new RegExp(data.query, "i") } },
        { content: { $regex: new RegExp(data.query, "i") } },
      ],
    })
      .populate<{
        categories: { _id: Types.ObjectId; name: string; createdAt: Date; updatedAt: Date };
      }>("categories")
      .lean();

    const mappedPosts = regexSearchResults.map((post) => ({
      postId: post._id,
      title: post.title,
      content: post.content,
      images: post.images,
      authorId: post.authorId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      categories: post.categories
        ? [
            {
              name: post.categories.name,
              categoryId: post.categories._id,
              createdAt: post.categories.createdAt,
              updatedAt: post.categories.updatedAt,
            },
          ]
        : [],
    }));

    return mappedPosts;
  }
}
