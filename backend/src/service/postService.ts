import { Types } from "mongoose";

import Post, { PostSchemaType } from "@src/models/postModel";
import { FormDataPost } from "@src/types/post";
import { PostError } from "@src/utils/Error";
import { validators } from "@src/utils/validators";
import { IUserWithId } from "@src/models/userModel";

export interface IPostService {
  createPost(arg: CreatePostArg): Promise<CreatePostReturn>;
  getPosts(): Promise<PostSchemaType[]>;
  updatePost(arg: UpdatePostArg): Promise<CreatePostReturn>;
  deletePost(postId: string): Promise<void>;
}

type CreatePostArg = {
  header: string | undefined;
  data: Partial<FormDataPost>;
  user: IUserWithId | undefined;
};

type UpdatePostArg = CreatePostArg & { postId: string };

type CreatePostReturn = PostSchemaType & { postId: Types.ObjectId };

export class PostService implements IPostService {
  // TODO: 이미지 URL 변환 작업하기
  async createPost({ header, data, user }: CreatePostArg): Promise<CreatePostReturn> {
    // 헤더검증
    if (!validators.checkContentType(header, "multipart/form-data")) {
      throw new PostError("The content-type is invalid.", 400);
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
      authorId: post.authorId,
      category: [],
    }));

    return mappedPosts;
  }

  // TODO: 포스트아이디와 사용자아이디 조인해서 가져오기
  async updatePost({ header, user, data, postId }: UpdatePostArg): Promise<CreatePostReturn> {
    // postId 검증
    if (!validators.isObjectId(postId)) {
      throw new PostError("Invalid postId", 404);
    }

    // 헤더검증
    if (!validators.checkContentType(header, "multipart/form-data")) {
      throw new PostError("The content-type is invalid.", 400);
    }

    // 유저정보검증
    if (!validators.checkRequestUser(user)) {
      throw new PostError("The request does not have valid user information.", 403);
    }

    const updatedPost = await Post.findByIdAndUpdate(postId, validators.cleanedValue(data), {
      new: true,
      runValidators: true,
    }).catch(() => {
      throw new PostError("Failed to update post item", 404);
    });

    if (!updatedPost) {
      throw new PostError("Failed to update post item", 404);
    }

    return {
      postId: updatedPost._id,
      title: updatedPost.title,
      content: updatedPost.content,
      images: updatedPost.images,
      authorId: updatedPost.authorId,
    };
  }

  async deletePost(postId: string | undefined): Promise<void> {
    if (!validators.isObjectId(postId)) {
      throw new PostError("Invalid postId", 404);
    }

    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      throw new PostError("Failed to delete post item", 404);
    }
  }
}
