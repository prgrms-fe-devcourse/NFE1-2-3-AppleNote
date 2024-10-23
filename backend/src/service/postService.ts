import Post, { PostSchemaType } from "@src/models/postModel";
import { PostError } from "@src/utils/Error";
import { validators } from "@src/utils/validators";
import { Types } from "mongoose";

export interface IPostService {
  createPost(data: PostSchemaType): Promise<PostSchemaType>;
  getPosts(): Promise<PostSchemaType[]>;
  deletePost(postId: string): Promise<void>;
}

export class PostService implements IPostService {
  // TODO: 이미지 URL 변환 작업하기
  async createPost(data: PostSchemaType): Promise<PostSchemaType & { postId: Types.ObjectId }> {
    if (!validators.keys(data, ["title", "content", "images", "category"])) {
      throw new PostError("Invalid request field.");
    }

    // TODO: 카테고리 id 조인하기
    const postData = new Post({ ...data, authorId: "652ea2f6c8a4fca1b8b9d6e2" });

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

  async deletePost(postId: string) {
    if (!validators.isObjectId(postId)) {
      throw new PostError("Invalid postId");
    }

    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      throw new PostError("Failed to delete post item");
    }
  }
}
