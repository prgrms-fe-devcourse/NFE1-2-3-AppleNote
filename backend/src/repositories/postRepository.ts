import Post from "@src/models/postModel";
import { Types } from "mongoose";

export interface IRepository<T, D> {
  create(data: T): Promise<D>;
}

// DTO 정의
export interface PostDTO {
  images?: string[];
  authorId: string | Types.ObjectId;
  temp?: boolean;
  title?: string;
  content?: string;
  categories?: CategorySchemaType;
  createdAt?: Date;
  updatedAt?: Date;
  deleteImages?: "true";
}

export interface PostPayload {
  postId: string;
  title: string;
  content: string;
  images: string[];
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

// 임시
interface CategorySchemaType {
  name: string;
  authorId: string | Types.ObjectId;
  posts: Omit<PostDTO, "categories" | "temp">[];
  createdAt: Date;
  updatedAt: Date;
}

export class MongoPostRepository implements IRepository<PostDTO, PostPayload> {
  async create(data: PostDTO): Promise<PostPayload> {
    const newPostData = new Post(data);

    const post = await newPostData.save();

    return {
      postId: post._id.toString(),
      title: post.title,
      content: post.content,
      images: post.images,
      authorId: post.authorId.toString(),
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  }

  // async findAll(data: Pick<PostDTO, "authorId" | "temp">) {}
}
