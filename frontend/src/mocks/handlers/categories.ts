import { BASE_URL } from "@common/api/fetch";
import { http, HttpResponse } from "msw";
import { validateContentBody, validateContentType } from "@mocks/helper";

// 카테고리 추가 요청 형식 정의
type CategoryAddRequest = {
  name: string;
};

// 초기 카테고리 데이터 (임시)
const categories = [
  { categoryId: "0192aa1b-1e1c-7775-ab3a-99a65a243e0f", name: "IT" },
  { categoryId: "0192aa1b-7277-7425-849f-eb52f8ca081c", name: "생활" },
  { categoryId: "d8249a93-ecfd-4f4b-922c-2b034b75c1fe", name: "취미" },
];

// 카테고리 ID 생성 함수
const generateCategoryId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

// MSW 핸들러 설정
export const handlers = [
  // 카테고리 목록 조회 핸들러
  http.get(`${BASE_URL}/categories`, async () => {
    return HttpResponse.json({
      statusCode: 200,
      payload: categories,
    });
  }),

  // 카테고리 추가 핸들러
  http.post(`${BASE_URL}/categories`, async ({ request }) => {
    let data: CategoryAddRequest | null = null;

    // 요청에서 JSON 데이터 파싱
    try {
      data = (await request.json()) as CategoryAddRequest;
    } catch {
      // 오류를 잡지만 변수는 정의하지 않음
      return HttpResponse.json(
        { error: { statusCode: 400, message: "잘못된 JSON 형식입니다." } },
        { status: 400 }
      );
    }

    // 데이터 검증: 필수 필드 및 형식 체크
    if (!data || typeof data.name !== "string") {
      return HttpResponse.json(
        { error: { statusCode: 422, message: "필수 필드가 누락되었습니다." } },
        { status: 422 }
      );
    }

    // Content-Type 검증
    await validateContentType(request, "application/json");

    // 필수 필드 검증
    await validateContentBody(!data.name, "필수 필드가 누락되었습니다.");

    // 새로운 카테고리 생성
    const newCategory = {
      categoryId: generateCategoryId(),
      name: data.name,
    };

    // 새로운 카테고리 목록에 추가
    categories.push(newCategory);

    return HttpResponse.json({
      statusCode: 201,
      payload: {
        categoryId: newCategory.categoryId,
      },
    });
  }),
];
