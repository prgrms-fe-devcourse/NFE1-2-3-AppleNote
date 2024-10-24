import { httpClient, BASE_URL } from "@common/api/fetch"; // httpClient 사용

// 카테고리 응답 타입 정의
export type CategoryResponse = {
  statusCode: number;
  payload: {
    categoryId: string;
    name: string;
  }[];
};

// 카테고리 데이터를 가져오는 함수
export const fetchCategories = async (): Promise<CategoryResponse> => {
  const response = await httpClient.get<CategoryResponse>(`${BASE_URL}/categories`);

  return response.data; // axios의 응답 구조에 맞게 수정
};

// 카테고리 추가 요청 타입 정의
export type CategoryAddRequest = {
  name: string;
};

// 카테고리 추가 API 함수
export const createCategory = async (data: CategoryAddRequest) => {
  const response = await httpClient.post(`${BASE_URL}/categories`, data);

  return response.data; // axios의 응답 구조에 맞게 수정
};

// 카테고리 수정 요청 타입 정의
export type CategoryUpdateRequest = {
  name: string;
  categoryId: string; // URL에 사용할 카테고리 ID
};

export const updateCategory = async (data: CategoryUpdateRequest) => {
  const { categoryId, ...updateData } = data; // categoryId를 URL에 사용하고 나머지 데이터를 body에 전달
  const response = await httpClient.put(`${BASE_URL}/categories/${categoryId}`, updateData);

  return response.data; // axios의 응답 구조에 맞게 수정
};

// 카테고리 삭제 API 호출 함수
export const deleteCategory = async (categoryId: string) => {
  const response = await httpClient.delete(`${BASE_URL}/categories/${categoryId}`);

  return response.data; // 성공 시 응답 데이터 반환
};
