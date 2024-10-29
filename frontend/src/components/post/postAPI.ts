import { httpClient, BASE_URL } from "@common/api/fetch";

export type Post = {
  postId: string;
  title: string;
  content: string;
  images: string[];
  authorId: string;
  category: string[];
};
export type PostResponse = {
  statusCode: number;
  payload: Post;
};
// 공통 API 호출 함수
const apiCall = async <T, D = unknown>(
  method: "get" | "post" | "put" | "delete",
  endpoint: string,
  data?: D
): Promise<T> => {
  try {
    const response = await httpClient[method]<T>(`${BASE_URL}${endpoint}`, data);

    return response.data;
  } catch (error) {
    // eslint-disable-next-line
    console.error(`API 요청 실패: ${error}`);
    throw new Error("서버와의 통신에 실패했습니다.");
  }
};

// 포스트 데이터 가져오기
export const fetchPost = async (id: string): Promise<PostResponse> =>
  apiCall<PostResponse>("get", `/posts/${id}`);
