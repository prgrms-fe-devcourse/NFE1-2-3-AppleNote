import { httpClient } from "@common/api/fetch";

export type Post = {
  postId: string;
  title: string;
  content: string;
  images: string[];
  authorId: string;
  category: string[];
};
export type FetchPostPayload = {
  statusCode: number;
  payload: Post;
};

export type DeletePostPayload = {
  statueCode: number;
  payload: {
    isRemove: boolean;
  };
};

/**
 * GET /posts/:id post data 가져오기
 * @requires Authorization Bearer {access-token}
 * @param id
 * @returns post data
 */
export const fetchPost = async (id: string): Promise<FetchPostPayload> => {
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
export const deletePost = async (id: string): Promise<DeletePostPayload> => {
  const URL = `/posts/${id}`;
  const { data } = await httpClient.delete(URL);

  return data;
};
