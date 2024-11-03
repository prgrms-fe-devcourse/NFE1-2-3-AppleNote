import { FormDataPost } from "@src/models/postModel";
import User from "@src/models/userModel";
import { ServiceError } from "@src/utils/Error";
import { validators } from "@src/utils/validators";
import { IUserWithId } from "@src/models/userModel";
import { IFileService } from "./fileService";
import {
  IPostRepository,
  PostDTO,
  PostPayload,
  PostPayloadWithCategory,
} from "@src/repositories/postRepository";

export interface IPostService {
  createPost(arg: CreatePostArg): Promise<PostPayload>;
  getPostList(arg: GetPostListArg): Promise<PostPayloadWithCategory[]>;
  updatePost(arg: UpdatePostArg): Promise<PostPayload>;
  deletePost(arg: DeletePostArg): Promise<void>;
  addCategoryToPost(arg: AddCategoryArg): Promise<AddCategoryReturn>;
  removeCategoryToPost(arg: RemoveCategoryArg): Promise<RemoveCategoryReturn>;
  getPost(arg: GetPostArg): Promise<PostPayloadWithCategory>;
  searchPostList(arg: SearchPostListArg): Promise<PostPayloadWithCategory[]>;
  getTempPostList(arg: GetPostListArg): Promise<PostPayloadWithCategory[]>;
}

// 재사용 가능한 기본 타입
type RequestUser = IUserWithId | undefined;
type RequestHeader = string | undefined;
type RequestData = Partial<FormDataPost>;
type WithPostId = { postId: string };
type WithUser = { user: RequestUser };
type WithCategories = { categories: string[] };
// type PostWithoutId = Omit<PostSchemaType, "_id" | "temp">;
// type PostWithId = PostWithoutId & { postId: Types.ObjectId };

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
// type GetPostListReturn = Omit<PostWithId, "categories">[];
// type CreatePostReturn = Omit<PostWithId, "categories">;
type AddCategoryReturn = WithCategories;
type RemoveCategoryReturn = WithCategories;
// type GetPostReturn = Omit<PostSchemaType, "categories" | "temp"> & { postId: Types.ObjectId } & {
//   categories: { name: string; categoryId: string; createdAt: Date; updatedAt: Date }[];
// };
// type SearchPostListReturn = Omit<PostWithId, "categories">[];

export class PostService implements IPostService {
  constructor(
    private fileService: IFileService,
    private postRepository: IPostRepository
  ) {}

  async createPost({ header, data, user }: CreatePostArg) {
    // 헤더검증
    if (!validators.checkContentType(header, "multipart/form-data")) {
      throw new ServiceError("The content-type is invalid.", 400);
    }

    // 필드검증
    if (!validators.keys(data, ["title", "content", "images", "temp"])) {
      throw new ServiceError("Invalid request field.", 422);
    }

    // 필드값 검증
    if (!validators.values(data, ["title", "content", "images"])) {
      throw new ServiceError("Invalid request field.", 422);
    }

    // 유저정보검증
    if (!validators.checkRequestUser(user)) {
      throw new ServiceError("The request does not have valid user information.", 403);
    }

    const fileToUrls = data.images?.files
      ? await this.fileService.uploadImageList(data.images.files)
      : [];

    const validUrls = validators
      .convertArray(data.images?.urls ?? "")
      .flat()
      .filter((value) => typeof value === "string" && value !== "");

    const payload = await this.postRepository.create({
      ...data,
      images: [...fileToUrls, ...validUrls],
      authorId: user.userId,
    });

    return payload;
  }

  async getPostList({ user }: GetPostListArg) {
    // 유저정보검증
    if (!validators.checkRequestUser(user)) {
      throw new ServiceError("The request does not have valid user information.", 403);
    }

    const payload = await this.postRepository.findAll({ userId: user.userId });

    return payload;
  }

  async updatePost({ header, user, data, postId }: UpdatePostArg): Promise<PostPayload> {
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

    const fileToUrls = data.images?.files
      ? await this.fileService.uploadImageList(data.images.files)
      : [];

    const validUrls = validators
      .convertArray(data.images?.urls ?? "")
      .flat()
      .filter((value) => typeof value === "string" && value !== "");

    const updatedImages = validators.cleanedValue({
      ...data,
      images: [...fileToUrls, ...validUrls],
    });

    const emptyImageList = {
      ...updatedImages,
      images: [],
    };

    const payload = await this.postRepository.update({
      authorId: user.userId,
      postId,
      data: (data.deleteImages === "true" ? emptyImageList : updatedImages) as PostDTO,
    });

    // 포스트 업데이트 여부
    if (!payload) {
      throw new ServiceError("Failed to update post item", 404);
    }

    return payload;
  }

  async deletePost({ postId, user }: DeletePostArg): Promise<void> {
    // postId 검증
    if (!validators.isObjectId(postId)) {
      throw new ServiceError("Invalid postId", 404);
    }

    // 유저정보검증
    if (!validators.checkRequestUser(user)) {
      throw new ServiceError("The request does not have valid user information.", 403);
    }

    const state = await this.postRepository.delete({ postId, userId: user.userId });

    if (!state.isExistPost) {
      throw new ServiceError("No posts with that postId were found.", 404);
    }

    if (!state.isDeleted) {
      throw new ServiceError("Failed to delete the post.", 404);
    }
  }

  async addCategoryToPost({ data, user, postId }: AddCategoryArg): Promise<AddCategoryReturn> {
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

    // 필드값 검증
    if (!validators.values(data, ["categories"])) {
      throw new ServiceError("Invalid request field.", 422);
    }

    // 단일 카테고리 처리
    if ((!data.categories && !validators.isArray(data.categories)) || data.categories.length > 1) {
      throw new ServiceError("Invalid request field.", 422);
    }

    const state = await this.postRepository.relateCategory({
      postId,
      userId: user.userId,
      categoryId: data.categories[0],
    });

    // 포스트 존재여부 검증
    if (!state.isExistPost) {
      throw new ServiceError("There are no items with that postId.", 404);
    }

    // 카테고리 존재여부 검증
    if (!state.isExistCategory) {
      throw new ServiceError("Invalid category ID.", 404);
    }

    // 카테고리와 포스트 조인여부 검증
    if (state.isExistCategoryToPost) {
      throw new ServiceError("Category already exists", 409);
    }

    // 작업 성공 여부 검증
    if (!state.isUpdatedCategory || !state.isUpdatedPost) {
      throw new ServiceError("Failed to update item", 404);
    }

    return { categories: state.categories };
  }

  async removeCategoryToPost({
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

    // 필드값 검증
    if (!validators.values(data, ["categories"])) {
      throw new ServiceError("Invalid request field.", 422);
    }

    // 단일 카테고리 처리
    if ((!data.categories && !validators.isArray(data.categories)) || data.categories.length > 1) {
      throw new ServiceError("Invalid request field.", 422);
    }

    const state = await this.postRepository.detachCategory({
      postId,
      userId: user.userId,
      categoryId: data.categories[0],
    });

    // 포스트 존재여부 검증
    if (!state.isExistPost) {
      throw new ServiceError("There are no items with that postId.", 404);
    }

    // 카테고리 존재여부 검증
    if (!state.isExistCategory) {
      throw new ServiceError("Invalid category ID.", 404);
    }

    // 카테고리와 포스트 조인여부 검증
    if (!state.isExistCategoryToPost) {
      throw new ServiceError("No post information in the category", 404);
    }

    // 작업 성공 여부 검증
    if (!state.isUpdatedCategory || !state.isUpdatedPost) {
      throw new ServiceError("Failed to update item", 404);
    }

    return { categories: state.categories };
  }

  async getPost({ postId, user }: GetPostArg): Promise<PostPayloadWithCategory> {
    // postId 검증
    if (!validators.isObjectId(postId)) {
      throw new ServiceError("Invalid postId", 404);
    }

    // 유저정보검증
    if (!validators.checkRequestUser(user)) {
      throw new ServiceError("The request does not have valid user information.", 403);
    }

    const payload = await this.postRepository.find({ postId, userId: user.userId });

    if (!payload) {
      throw new ServiceError("There are no items with that postId.", 404);
    }

    return payload;
  }

  async getTempPostList({ user }: GetPostListArg): Promise<PostPayloadWithCategory[]> {
    // 유저정보검증
    if (!validators.checkRequestUser(user)) {
      throw new ServiceError("The request does not have valid user information.", 403);
    }

    const payload = await this.postRepository.findAll({ userId: user.userId, temp: true });

    return payload;
  }

  async searchPostList({ user, data }: SearchPostListArg): Promise<PostPayloadWithCategory[]> {
    // 유저 필드 타입 검증
    if (!validators.checkRequestUser(user)) {
      throw new ServiceError("The request does not have valid user information.", 403);
    }

    // 필드검증
    if (!validators.keys(data, ["query"])) {
      throw new ServiceError("Invalid request field.", 422);
    }

    // 필드값 검증
    if (!validators.values(data, ["query"])) {
      throw new ServiceError("Invalid request field.", 422);
    }

    const payload = await this.postRepository.search({ userId: user.userId, query: data.query });

    return payload;
  }
}
