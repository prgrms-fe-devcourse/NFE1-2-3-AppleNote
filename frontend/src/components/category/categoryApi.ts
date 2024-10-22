import { BASE_URL } from "@common/api/fetch";

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
  const response = await fetch(`${BASE_URL}/categories`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
