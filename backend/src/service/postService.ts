import Post, { PostSchemaType } from "@src/models/postModel";
import { PostError } from "@src/utils/Error";
import { validators } from "@src/utils/validators";

export interface IPostService {
  createPost(data: PostSchemaType): Promise<PostSchemaType>;
  getPosts(): Promise<ExtendedPostSchemaType[]>;
  deletePost(postId: string): Promise<void>;
}

// TODO: 타입 분리
interface ExtendedPostSchemaType extends PostSchemaType {
  category: {
    categoryId: string;
    name: string;
  }[];
}

export class PostService implements IPostService {
  async createPost(data: PostSchemaType): Promise<PostSchemaType> {
    const userData = new Post(data);

    return await userData.save();
  }

  // TODO: 사용자 구분하기
  // TODO: 카테고리 참조
  async getPosts(): Promise<ExtendedPostSchemaType[]> {
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
