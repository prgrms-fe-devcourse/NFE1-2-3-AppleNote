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

export type CategoryAddRequest = {
  name: string;
};

// 카테고리 추가 API 함수
export const createCategory = async (data: CategoryAddRequest) => {
  const response = await fetch(`${BASE_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // 여기에 data가 { name: string } 형태여야 합니다.
  });

  if (!response.ok) {
    throw new Error("카테고리 생성에 실패했습니다.");
  }

  return response.json();
};
