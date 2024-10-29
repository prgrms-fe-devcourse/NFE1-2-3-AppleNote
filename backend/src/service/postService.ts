import { Types } from "mongoose";

import Post, { PostSchemaType } from "@src/models/postModel";
import User from "@src/models/userModel";
import Category from "@src/models/categoryModel";
import { FormDataPost } from "@src/types/post";
import { ServiceError } from "@src/utils/Error";
import { validators } from "@src/utils/validators";
import { IUserWithId } from "@src/models/userModel";

export interface IPostService {
  createPost(arg: CreatePostArg): Promise<CreatePostReturn>;
  getPosts(arg: GetPostsArg): Promise<GetPostReturn>;
  updatePost(arg: UpdatePostArg): Promise<UpdatePostReturn>;
  deletePost(arg: DeletePostArg): Promise<void>;
  addCategory(arg: AddCategoryArg): Promise<AddCategoryReturn>;
}

// TODO: 타입 개선하기
type RequestUser = IUserWithId | undefined;
type RequestData = Partial<FormDataPost>;
type RequestHeader = string | undefined;

type GetPostsArg = {
  user: RequestUser;
};
type CreatePostArg = {
  header: RequestHeader;
  data: RequestData;
  user: RequestUser;
};
type UpdatePostArg = CreatePostArg & { postId: string };
type DeletePostArg = GetPostsArg & { postId: string };
type AddCategoryArg = GetPostsArg & { postId: string; data: { categories: string[] } };

type GetPostReturn = PostSchemaType[];
type UpdatePostReturn = PostSchemaType & { postId: Types.ObjectId };
type CreatePostReturn = PostSchemaType & { postId: Types.ObjectId };
type AddCategoryReturn = { categories: string[] };

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
  async getPosts({ user }: GetPostsArg): Promise<GetPostReturn> {
    // 유저정보검증
    if (!validators.checkRequestUser(user)) {
      throw new ServiceError("The request does not have valid user information.", 403);
    }

    const posts = await Post.find({ authorId: user.userId }).lean();
    const mappedPosts = posts.map((post) => ({
      postId: post._id,
      title: post.title,
      content: post.content,
      images: post.images,
      authorId: post.authorId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
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

    const updatedPost = await Post.findByIdAndUpdate(
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

    const deletedPost = await Post.findOneAndDelete({ _id: postId, authorId: user.userId });

    // 포스트 검증
    if (!deletedPost) {
      throw new ServiceError("Failed to delete post item", 404);
    }
  }

  async addCategory({ data, user, postId }: AddCategoryArg): Promise<AddCategoryReturn> {
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

    // 카테고리 검증
    const categoryExist = await Category.findOne({ postId, authorId: user.userId });

    if (categoryExist) {
      throw new ServiceError("Category already exists", 409);
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      { _id: categoryId, authorId: user.userId },
      { $addToSet: { postId } },
      { new: true, runValidators: true }
    );

    // 카테고리 업데이트 여부
    if (!updatedCategory) {
      throw new ServiceError("Failed to update category item", 404);
    }

    return { categories: [categoryId] };
  }
}
