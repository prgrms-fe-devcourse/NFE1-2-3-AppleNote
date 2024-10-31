import { httpClient } from "@common/api/fetch";

export type Post = {
  postId: string;
  title: string;
  content: string;
  images: string[];
  authorId: string;
  category: string[];
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
  images?: string[];
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
  const { data } = await httpClient.patch(URL, payload);

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
  const { data } = await httpClient.post(URL, payload);

  return data;
};
