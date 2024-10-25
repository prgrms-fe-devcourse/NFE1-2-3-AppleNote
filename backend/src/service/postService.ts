import { Types } from "mongoose";

import Post, { PostSchemaType } from "@src/models/postModel";
import { FormDataPost } from "@src/types/post";
import { PostError } from "@src/utils/Error";
import { validators } from "@src/utils/validators";
import { IUserWithId } from "@src/models/userModel";

export interface IPostService {
  createPost(arg: CreatePostArg): Promise<CreatePostReturn>;
  getPosts(arg: GetPostsArg): Promise<GetPostReturn>;
  updatePost(arg: UpdatePostArg): Promise<UpdatePostReturn>;
  deletePost(arg: DeletePostArg): Promise<void>;
}

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

type GetPostReturn = PostSchemaType[];
type UpdatePostReturn = PostSchemaType & { postId: Types.ObjectId };
type CreatePostReturn = PostSchemaType & { postId: Types.ObjectId };

export class PostService implements IPostService {
  // TODO: 이미지 URL 변환 작업하기
  async createPost({ header, data, user }: CreatePostArg): Promise<CreatePostReturn> {
    // 헤더검증
    if (!validators.checkContentType(header, "multipart/form-data")) {
      throw new PostError("The content-type is invalid.", 400);
    }

    // TODO: 올바르지 않은 필드 포함시 에러 발생시키기
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

  // DONE: 사용자 구분하기 [V]
  // TODO: 카테고리 참조
  async getPosts({ user }: GetPostsArg): Promise<GetPostReturn> {
    // 유저정보검증
    if (!validators.checkRequestUser(user)) {
      throw new PostError("The request does not have valid user information.", 403);
    }

    const posts = await Post.find({ authorId: user.userId }).lean();
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
  async updatePost({ header, user, data, postId }: UpdatePostArg): Promise<UpdatePostReturn> {
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

    // 포스트 검증
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

  // DONE: 사용자 유저의 포스트만 삭제 가능하도록 구현하기 [V]
  async deletePost({ postId, user }: DeletePostArg): Promise<void> {
    // postId 검증
    if (!validators.isObjectId(postId)) {
      throw new PostError("Invalid postId", 404);
    }

    // 유저정보검증
    if (!validators.checkRequestUser(user)) {
      throw new PostError("The request does not have valid user information.", 403);
    }

    const deletedPost = await Post.findOneAndDelete({ _id: postId, authorId: user.userId });

    // 포스트 검증
    if (!deletedPost) {
      throw new PostError("Failed to delete post item", 404);
    }
  }
}
