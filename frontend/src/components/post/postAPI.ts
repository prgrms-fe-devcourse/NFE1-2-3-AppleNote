import { httpClient, httpClientMultipart } from "@common/api/fetch";

export type Post = {
  postId: string;
  title: string;
  content: string;
  images: string[];
  authorId: string;
  categories: { categoryId: string; name: string }[];
  createdAt: Date;
};
export type FetchPostResponse = {
  statusCode: number;
  payload: Post;
};

export type DeletePostResponse = {
  statueCode: number;
  payload: {
    isRemove: boolean;
  };
};

export type PatchPostResponse = {
  statusCode: number;
  payload: Post;
};

export type CreatePostResponse = {
  statusCode: number;
  payload: Post;
};

export type PostPayload = {
  title?: string;
  content?: string;
  images?: (File | string)[];
  temp?: boolean;
};

export type CreatePostCagegoryResponse = {
  statusCode: number;
  payload: string[];
};

/**
 * GET /posts/:id post data 가져오기
 * @requires Authorization Bearer {access-token}
 * @param id
 * @returns post data
 */
export const fetchPost = async (id: string): Promise<FetchPostResponse> => {
  const URL = `/posts/${id}`;
  const { data } = await httpClient.get(URL);

  return data;
};

/**
 * DELETE /posts/:id post data 삭제하기
 * @requires Authorization Bearer {access-token}
 * @param id
 * @returns isRemove 값 반환
 */
export const deletePost = async (id: string): Promise<DeletePostResponse> => {
  const URL = `/posts/${id}`;
  const { data } = await httpClient.delete(URL);

  return data;
};

/**
 * PATCH /posts/:id post data 수정하기
 * @requires Authorization Bearer {access-token}
 * @param id
 * @returns 수정된 post data
 */
export const patchPost = async (id: string, payload: PostPayload): Promise<PatchPostResponse> => {
  const URL = `/posts/${id}`;
  const formData = new FormData();

  if (payload.title) formData.append("title", payload.title);
  if (payload.content) formData.append("content", payload.content);
  if (payload.images && Array.isArray(payload.images)) {
    payload.images.forEach((image) => {
      if (image instanceof File) {
        formData.append("images", image);
      }
    });
  }

  const { data } = await httpClientMultipart.patch(URL, formData);

  return data;
};

/**
 * POST /posts post data 생성하기
 * @requires Authorization Bearer {access-token}
 * @param payload postform 양식
 * @returns 생성된 post data
 */
export const createPost = async (payload: PostPayload): Promise<PatchPostResponse> => {
  const URL = `/posts`;
  const formData = new FormData();

  if (payload.title) formData.append("title", payload.title);
  if (payload.content) formData.append("content", payload.content);
  if (payload.images && Array.isArray(payload.images)) {
    payload.images.forEach((image) => {
      if (image instanceof File) {
        formData.append("images", image);
      }
    });
  }

  const { data } = await httpClientMultipart.post(URL, formData);

  return data;
};

/**
 * POST /posts temp post data 생성하기
 * @requires Authorization Bearer {access-token}
 * @param payload postform 양식
 * @returns 생성된 temp post data
 */
export const tempCreatePost = async (payload: PostPayload): Promise<PatchPostResponse> => {
  const URL = `/posts`;
  const formData = new FormData();

  if (payload.title) formData.append("title", payload.title);
  if (payload.content) formData.append("content", payload.content);
  if (payload.images && Array.isArray(payload.images)) {
    payload.images.forEach((image) => {
      if (image instanceof File) {
        formData.append("images", image);
      }
    });
  }
  if (payload.temp) formData.append("temp", payload.temp.toString());

  const { data } = await httpClientMultipart.post(URL, formData);

  return data;
};

/**
 * GET /posts/temp temp post list 조회
 * @requires Authorization Bearer {access-token}
 * @param payload postform 양식
 * @returns 생성된 temp post list 조회
 */
export const tempPostList = async () => {
  const URL = `/posts/temp`;
  const { data } = await httpClient.get(URL);

  return data;
};

/**
 * POST /posts/{postId}/categories
 * @requires Authorization Bearer {access-token}
 * @param payload category[]
 * @returns 완료
 */
export const createPostCagegory = async (postId: string, payload: string[]) => {
  const URL = `/posts/${postId}/categories`;

  const { data } = await httpClient.post(URL, { categories: payload });

  return data;
};
