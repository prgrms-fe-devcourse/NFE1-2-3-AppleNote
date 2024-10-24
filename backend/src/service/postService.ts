import { Types } from "mongoose";

import Post, { PostSchemaType } from "@src/models/postModel";
import { FormDataPost } from "@src/types/post";
import { PostError } from "@src/utils/Error";
import { validators } from "@src/utils/validators";
import { IUserWithId } from "@src/models/userModel";

export interface IPostService {
  createPost(arg: CreatePostArg): Promise<CreatePostReturn>;
  getPosts(): Promise<PostSchemaType[]>;
  deletePost(postId: string): Promise<void>;
}

type CreatePostArg = {
  header: string | undefined;
  data: Partial<FormDataPost>;
  user: IUserWithId | undefined;
};

type CreatePostReturn = PostSchemaType & { postId: Types.ObjectId };

export class PostService implements IPostService {
  // TODO: 이미지 URL 변환 작업하기
  async createPost({ header, data, user }: CreatePostArg): Promise<CreatePostReturn> {
    // 헤더검증
    if (!validators.checkContentType(header, "multipart/form-data")) {
      throw new PostError("The content-type is invalid.", 422);
    }

    // 필드검증
    if (!validators.keys(data, ["title", "content", "images", "category"])) {
      throw new PostError("Invalid request field.", 422);
    }

    // 유저정보검증
    if (!validators.checkRequestUser(user)) {
      throw new PostError("The request does not have valid user information.", 403);
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
      category: [],
    };
  }

  // TODO: 사용자 구분하기
  // TODO: 카테고리 참조
  async getPosts(): Promise<PostSchemaType[]> {
    const posts = await Post.find().lean();
    const mappedPosts = posts.map((post) => ({
      postId: post._id,
      title: post.title,
      content: post.content,
      images: post.images,
      createdAt: post.createdAt,
      updateAt: post.updatedAt,
      authorId: post.authorId,
      category: [],
    }));

    return mappedPosts;
  }

  async deletePost(postId: string | undefined) {
    if (!validators.isObjectId(postId)) {
      throw new PostError("Invalid postId", 404);
    }

    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      throw new PostError("Failed to delete post item", 404);
    }
  }
}
