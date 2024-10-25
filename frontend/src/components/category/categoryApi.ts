import { httpClient, BASE_URL } from "@common/api/fetch";

export type Category = {
  categoryId: string;
  name: string;
};

export type CategoryResponse = {
  statusCode: number;
  payload: Category[];
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
    console.error(`API 요청 실패: ${error}`);
    throw new Error("서버와의 통신에 실패했습니다.");
  }
};

// 카테고리 데이터 가져오기
export const fetchCategories = async (): Promise<CategoryResponse> =>
  apiCall<CategoryResponse>("get", "/categories");

// 카테고리 추가
export type CategoryAddRequest = { name: string };
export const createCategory = async (data: CategoryAddRequest) =>
  apiCall("post", "/categories", data);

// 카테고리 수정
export type CategoryUpdateRequest = { name: string; categoryId: string };
export const updateCategory = async (data: CategoryUpdateRequest) => {
  const { categoryId, ...updateData } = data;

  return apiCall("put", `/categories/${categoryId}`, updateData);
};

// 카테고리 삭제
export const deleteCategory = async (categoryId: string) =>
  apiCall("delete", `/categories/${categoryId}`);
