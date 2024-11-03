import { httpClient } from "@common/api/fetch";

// 포스트 타입 정의
export interface Post {
  postId: string;
  title: string;
  content: string;
  images: string[];
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  categories: { categoryId: string; name: string }[];
}

// 최신 포스트 3개 가져오기
export const fetchLatestPosts = async (): Promise<Post[]> => {
  const response = await httpClient.get<{ payload: Post[] }>("/posts");

  return response.data.payload
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);
};

// 전체 포스트 가져오기 (검색에서 사용)
export const fetchAllPosts = async (): Promise<Post[]> => {
  const response = await httpClient.get<{ payload: Post[] }>("/posts");

  return response.data.payload.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

// 페이지네이션 적용한 전체 포스트 목록 가져오기
export const fetchPostsByPage = async (page: number, postsPerPage: number): Promise<Post[]> => {
  const response = await httpClient.get<{ payload: Post[] }>("/posts");

  const sortedPosts = response.data.payload.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const startIndex = (page - 1) * postsPerPage;

  return sortedPosts.slice(startIndex, startIndex + postsPerPage);
};

// 특정 카테고리별 최신 포스트 최대 4개 가져오기
export const fetchLatestPostsByCategoryId = async (categoryId: string): Promise<Post[]> => {
  const response = await httpClient.get<{ payload: { posts: Post[] } }>(
    `/categories/${categoryId}`
  );

  return response.data.payload.posts
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);
};

// 특정 카테고리별 포스트 목록 가져오기
export const fetchPostsByCategoryId = async (categoryId: string): Promise<Post[]> => {
  const response = await httpClient.get<{ payload: { posts: Post[] } }>(
    `/categories/${categoryId}`
  );

  return response.data.payload.posts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};
