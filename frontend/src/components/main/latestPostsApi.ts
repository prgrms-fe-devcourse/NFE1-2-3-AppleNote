import { httpClient } from "@common/api/fetch";

export interface Post {
  postId: string;
  title: string;
  content: string;
  images: string[];
  authorId: string;
  createAt: Date;
  updateAt: Date;
  category: { categoryId: string; name: string }[];
}

// 최신 포스트를 받아오는 API 함수
export const fetchLatestPosts = async (): Promise<Post[]> => {
  const response = await httpClient.get<{ payload: Post[] }>("/posts");

  // 최신순 정렬 후 3개만 반환
  return response.data.payload
    .sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime())
    .slice(0, 3);
};
