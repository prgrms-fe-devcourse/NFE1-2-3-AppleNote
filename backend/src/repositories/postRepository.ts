import mongoose, { Types } from "mongoose";

import Post from "@src/models/postModel";
import Category from "@src/models/categoryModel";
export interface IPostRepository {
  create(arg: PostDTO): Promise<PostPayload>;
  search(arg: SearchArg): Promise<PostPayloadWithCategory[]>;
  find(arg: FindArg): Promise<PostPayloadWithCategory | null>;
  findAll(arg: FindAllArg): Promise<PostPayloadWithCategory[]>;
  update(arg: UpdateArg): Promise<PostPayload | null>;
  delete(arg: DeleteArg): Promise<{
    isExistPost: boolean;
    isDeleted: boolean;
  }>;
  relateCategory(arg: AddCategoryToPostArg): Promise<{
    isExistPost: boolean;
    isExistCategory: boolean;
    isExistCategoryToPost: boolean;
    isUpdatedCategory: boolean;
    isUpdatedPost: boolean;
    categories: string[];
  }>;
  detachCategory(arg: DetachCategoryArg): Promise<{
    isExistPost: boolean;
    isExistCategory: boolean;
    isExistCategoryToPost: boolean;
    isUpdatedCategory: boolean;
    isUpdatedPost: boolean;
    categories: string[];
  }>;
}

type SearchArg = {
  userId: string;
  query: string;
};

type FindArg = {
  userId: string;
  postId: string;
};

type FindAllArg = {
  userId: string;
  temp?: boolean;
};

type DetachCategoryArg = {
  categoryId: string;
  userId: string;
  postId: string;
};

type AddCategoryToPostArg = {
  categoryId: string;
  userId: string;
  postId: string;
};

type DeleteArg = {
  userId: string;
  postId: string;
};

type UpdateArg = {
  authorId: string;
  postId: string;
  data: PostDTO;
};

// DTO 정의
export interface PostDTO {
  images?: string[];
  authorId: string | Types.ObjectId;
  temp?: boolean;
  title?: string;
  content?: string;
  categories?: CategoryDTO;
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

interface CategoryPayload {
  name: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

// 임시
interface CategoryDTO {
  name?: string;
  authorId?: string | Types.ObjectId;
  posts?: Omit<PostDTO, "categories" | "temp">[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface CategorySchema {
  _id: Types.ObjectId;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  posts: Omit<PostSchema, "categories" | "temp">[];
}

export interface PostSchema {
  _id: Types.ObjectId;
  temp: boolean;
  title: string;
  content: string;
  images: string[];
  authorId: Types.ObjectId;
  categories: CategorySchema[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PostPayloadWithCategory extends PostPayload {
  categories: CategoryPayload[];
}

export class MongoPostRepository implements IPostRepository {
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

  async search({ userId, query }: SearchArg): Promise<PostPayloadWithCategory[]> {
    const regexSearchResults = await Post.find({
      authorId: userId,
      temp: false,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } },
      ],
    })
      .populate<{
        categories: CategorySchema[];
        // TODO: 하드코딩된 문자열 대신 상수처리하기
      }>("categories")
      .lean();

    return regexSearchResults.map((post) => {
      return {
        postId: post._id.toString(),
        title: post.title,
        content: post.content,
        images: post.images,
        authorId: post.authorId.toString(),
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        categories:
          post.categories.length && post.categories.length > 0
            ? [
                {
                  name: post.categories[0].name,
                  categoryId: post.categories[0]._id.toString(),
                  createdAt: post.categories[0].createdAt,
                  updatedAt: post.categories[0].updatedAt,
                },
              ]
            : [],
      };
    });
  }

  async find({ postId, userId }: FindArg): Promise<PostPayloadWithCategory | null> {
    const post = await Post.findOne({ _id: postId, authorId: userId })
      .populate<{
        categories: CategorySchema[];
        // TODO: 하드코딩된 문자열 대신 상수처리하기
      }>("categories")
      .lean();

    if (!post) {
      return null;
    }

    return {
      postId: post._id.toString(),
      title: post.title,
      content: post.content,
      images: post.images,
      authorId: post.authorId.toString(),
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      categories:
        post.categories.length && post.categories.length > 0
          ? [
              {
                name: post.categories[0].name,
                categoryId: post.categories[0]._id.toString(),
                createdAt: post.categories[0].createdAt,
                updatedAt: post.categories[0].updatedAt,
              },
            ]
          : [],
    };
  }

  async findAll({ userId, temp = false }: FindAllArg): Promise<PostPayloadWithCategory[]> {
    const postList = await Post.find({ authorId: userId, temp })
      .populate<{
        categories: CategorySchema[];
        // TODO: 하드코딩된 문자열 대신 상수처리하기
      }>("categories")
      .lean();

    return postList.map((post) => {
      return {
        postId: post._id.toString(),
        title: post.title,
        content: post.content,
        images: post.images,
        authorId: post.authorId.toString(),
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        categories:
          post.categories.length && post.categories.length > 0
            ? [
                {
                  name: post.categories[0].name,
                  categoryId: post.categories[0]._id.toString(),
                  createdAt: post.categories[0].createdAt,
                  updatedAt: post.categories[0].updatedAt,
                },
              ]
            : [],
      };
    });
  }

  async update({ authorId, postId, data }: UpdateArg): Promise<PostPayload | null> {
    const updatedPost = await Post.findOneAndUpdate({ authorId, _id: postId }, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedPost) {
      return null;
    }

    return {
      postId: updatedPost._id.toString(),
      title: updatedPost.title,
      content: updatedPost.content,
      images: updatedPost.images,
      authorId: updatedPost.authorId.toString(),
      createdAt: updatedPost.createdAt,
      updatedAt: updatedPost.updatedAt,
    };
  }

  async delete({ userId, postId }: DeleteArg): Promise<{
    isExistPost: boolean;
    isDeleted: boolean;
  }> {
    const state = {
      isExistPost: false,
      isDeleted: false,
    };

    const session = await mongoose.startSession();

    session.startTransaction();

    try {
      const isExistPost = await Post.exists({ _id: postId, authorId: userId });

      // 포스트 검증
      if (!isExistPost) {
        return state;
      }

      state.isExistPost = true;
      // 포스트 삭제
      const deletedPost = await Post.deleteOne({ _id: postId, authorId: userId }, { session });

      if (deletedPost.deletedCount === 0) {
        return state;
      }

      state.isDeleted = true;
      // 카테고리에서 포스트 ID 제거
      await Category.updateMany(
        { posts: postId, authorId: userId },
        { $pull: { posts: postId } },
        { session }
      );

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

  async relateCategory({ postId, userId, categoryId }: AddCategoryToPostArg): Promise<{
    isExistPost: boolean;
    isExistCategory: boolean;
    isExistCategoryToPost: boolean;
    isUpdatedCategory: boolean;
    isUpdatedPost: boolean;
    categories: string[];
  }> {
    const state = {
      isExistPost: false,
      isExistCategory: false,
      isExistCategoryToPost: true,
      isUpdatedCategory: false,
      isUpdatedPost: false,
      categories: [],
    };

    const isExistPost = await Post.exists({ _id: postId, authorId: userId });

    // 포스트 존재여부 검증
    if (!isExistPost) {
      return state;
    }

    state.isExistPost = true;
    const isExistCategory = await Category.exists({ _id: categoryId, authorId: userId });

    // 카테고리 존재여부 검증
    if (!isExistCategory) {
      return state;
    }

    state.isExistCategory = true;
    const isExistCategoryToPost = await Category.findOne({
      posts: postId,
      authorId: userId,
    });

    // 카테고리와 포스트 조인여부 검증
    if (isExistCategoryToPost) {
      return state;
    }

    state.isExistCategoryToPost = false;
    const session = await mongoose.startSession();

    session.startTransaction();

    try {
      // 카테고리 업데이트 (카테고리의 posts 배열에 포스트 ID 추가)
      const updatedCategory = await Category.findOneAndUpdate(
        { _id: categoryId, authorId: userId },
        { $addToSet: { posts: postId } }, // 카테고리에 포스트 ID 업데이트
        { new: true, runValidators: true, session }
      );

      state.isUpdatedCategory = true;

      // 포스트에 카테고리 ID 추가
      const updatedPost = await Post.findOneAndUpdate(
        { _id: postId, authorId: userId },
        { $addToSet: { categories: categoryId } }, // 포스트에 카테고리 ID 업데이트
        { new: true, runValidators: true, session }
      );

      state.isUpdatedPost = true;

      if (!updatedCategory || !updatedPost) {
        return state;
      }

      await session.commitTransaction();

      return { ...state, categories: [categoryId] };
    } catch (error) {
      await session.abortTransaction();

      // 예외 던지기
      throw error;
    } finally {
      await session.endSession();
    }
  }

  async detachCategory({ postId, userId, categoryId }: DetachCategoryArg): Promise<{
    isExistPost: boolean;
    isExistCategory: boolean;
    isExistCategoryToPost: boolean;
    isUpdatedCategory: boolean;
    isUpdatedPost: boolean;
    categories: string[];
  }> {
    const state = {
      isExistPost: false,
      isExistCategory: false,
      isExistCategoryToPost: false,
      isUpdatedCategory: false,
      isUpdatedPost: false,
      categories: [],
    };

    const isExistPost = await Post.exists({ _id: postId, authorId: userId });

    // 포스트 존재여부 검증
    if (!isExistPost) {
      return state;
    }

    state.isExistPost = true;
    const isExistCategory = await Category.exists({ _id: categoryId, authorId: userId });

    // 카테고리 존재여부 검증
    if (!isExistCategory) {
      return state;
    }

    state.isExistCategory = true;
    const isExistCategoryToPost = await Category.findOne({
      posts: postId,
      authorId: userId,
      _id: categoryId,
    });

    // 카테고리와 포스트 조인여부 검증
    if (!isExistCategoryToPost) {
      return state;
    }

    state.isExistCategoryToPost = true;
    const session = await mongoose.startSession();

    session.startTransaction();

    try {
      // 카테고리에서 포스트 ID 제거
      const updatedCategory = await Category.findOneAndUpdate(
        { _id: categoryId, authorId: userId },
        { $pull: { posts: postId } }, // 카테고리의 posts 배열에서 포스트 ID 제거
        { new: true, session }
      );

      state.isUpdatedCategory = true;

      // 포스트에서 카테고리 ID 제거
      const updatedPost = await Post.findOneAndUpdate(
        { _id: postId, authorId: userId },
        { $pull: { categories: categoryId } }, // 포스트의 categories 배열에서 카테고리 ID 제거
        { new: true, session }
      );

      state.isUpdatedPost = true;

      if (!updatedCategory || !updatedPost) {
        return state;
      }

      await session.commitTransaction();

      return { ...state, categories: [categoryId] };
    } catch (error) {
      await session.abortTransaction();

      // 예외 던지기
      throw error;
    } finally {
      await session.endSession();
    }
  }
}
