import { httpClient } from "@common/api/fetch";

// 포스트 타입 정의
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

// 최신 포스트 3개 가져오기
export const fetchLatestPosts = async (): Promise<Post[]> => {
  const response = await httpClient.get<{ payload: Post[] }>("/posts");

  // 최신순 정렬 후 3개만 반환
  return response.data.payload
    .sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime())
    .slice(0, 3);
};

// 전체 포스트 목록 가져오기 (페이지네이션 적용)
export const fetchPostsByPage = async (page: number, postsPerPage: number): Promise<Post[]> => {
  const response = await httpClient.get<{ payload: Post[] }>("/posts");

  // 최신순 정렬 후 페이지에 맞는 포스트 반환
  const sortedPosts = response.data.payload.sort(
    (a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
  );

  const startIndex = (page - 1) * postsPerPage;

  return sortedPosts.slice(startIndex, startIndex + postsPerPage);
};

// 특정 카테고리별 포스트 목록 가져오기 (페이지네이션 적용)
export const fetchPostsByCategory = async (
  categoryName: string,
  page: number,
  postsPerPage: number
): Promise<Post[]> => {
  const response = await httpClient.get<{ payload: Post[] }>("/posts");

  // 특정 카테고리에 해당하는 포스트 필터링
  const filteredPosts = response.data.payload.filter((post) =>
    post.category.some((cat) => cat.name === categoryName)
  );

  // 최신순 정렬 후 페이지에 맞는 포스트 반환
  const sortedPosts = filteredPosts.sort(
    (a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
  );

  const startIndex = (page - 1) * postsPerPage;

  return sortedPosts.slice(startIndex, startIndex + postsPerPage);
};
