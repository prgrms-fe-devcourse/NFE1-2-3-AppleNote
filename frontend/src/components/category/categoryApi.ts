import { httpClient, BASE_URL } from "@common/api/fetch";

export type Category = {
  categoryId: string;
  name: string;
};

export type CategoryResponse = {
  statusCode: number;
  payload: Category[];
};

// 카테고리 데이터 가져오기
export const fetchCategories = async (): Promise<CategoryResponse> => {
  try {
    const response = await httpClient.get<CategoryResponse>(`${BASE_URL}/categories`);

    return response.data;
  } catch (error) {
    console.error(`카테고리 데이터 가져오기 실패: ${error}`);
    throw new Error("서버와의 통신에 실패했습니다.");
  }
};

// 카테고리 추가
export type CategoryAddRequest = { name: string };
export const createCategory = async (data: CategoryAddRequest) => {
  try {
    const response = await httpClient.post(`${BASE_URL}/categories`, data);

    return response.data;
  } catch (error) {
    console.error(`카테고리 추가 실패: ${error}`);
    throw new Error("서버와의 통신에 실패했습니다.");
  }
};

// 카테고리 수정
export type CategoryUpdateRequest = { name: string; categoryId: string };
export const updateCategory = async (data: CategoryUpdateRequest) => {
  const { categoryId, ...updateData } = data;

  try {
    const response = await httpClient.put(`${BASE_URL}/categories/${categoryId}`, updateData);

    return response.data;
  } catch (error) {
    console.error(`카테고리 수정 실패: ${error}`);
    throw new Error("서버와의 통신에 실패했습니다.");
  }
};

// 카테고리 삭제
export const deleteCategory = async (categoryId: string) => {
  try {
    const response = await httpClient.delete(`${BASE_URL}/categories/${categoryId}`);

    return response.data;
  } catch (error) {
    console.error(`카테고리 삭제 실패: ${error}`);
    throw new Error("서버와의 통신에 실패했습니다.");
  }
};

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

// 특정 카테고리별 포스트 목록 가져오기
export const fetchPostsByCategoryId = async (categoryId: string): Promise<Post[]> => {
  const response = await httpClient.get<{ payload: { posts: Post[] } }>(
    `/categories/${categoryId}`
  );

  return response.data.payload.posts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};
