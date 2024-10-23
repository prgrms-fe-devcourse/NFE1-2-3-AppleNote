import { http, HttpResponse } from "msw";

// 카테고리 추가 요청 형식 정의
type CategoryAddRequest = {
  name: string;
};

// 초기 카테고리 데이터 (임시)
const categories = [
  { categoryId: "0192aa1b-1e1c-7775-ab3a-99a65a243e0f", name: "Technology" },
  { categoryId: "0192aa1b-7277-7425-849f-eb52f8ca081c", name: "Schedules" },
  { categoryId: "d8249a93-ecfd-4f4b-922c-2b034b75c1fe", name: "Diary" },
];

// 카테고리 ID 생성 함수
const generateCategoryId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

// MSW 핸들러 설정
export const handlers = [
  // 카테고리 목록 조회 핸들러
  http.get("/categories", async () => {
    return HttpResponse.json({
      statusCode: 200,
      payload: categories,
    });
  }),

  // 카테고리 추가 핸들러
  http.post("/categories", async ({ request }) => {
    let data: CategoryAddRequest | null = null;

    // 요청에서 JSON 데이터 파싱
    try {
      data = (await request.json()) as CategoryAddRequest;
    } catch {
      return HttpResponse.json(
        { error: { statusCode: 400, message: "잘못된 JSON 형식입니다." } },
        { status: 400 }
      );
    }

    // 데이터 검증: 필수 필드 및 형식 체크
    if (typeof data.name !== "string") {
      return HttpResponse.json(
        { error: { statusCode: 422, message: "필수 필드가 누락되었습니다." } },
        { status: 422 }
      );
    }

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

  // 카테고리 수정 핸들러
  http.put("/categories/:categoryId", async ({ params, request }) => {
    let data: CategoryAddRequest | null = null;

    // 요청에서 JSON 데이터 파싱
    try {
      data = (await request.json()) as CategoryAddRequest;
    } catch {
      return HttpResponse.json(
        { error: { statusCode: 400, message: "잘못된 JSON 형식입니다." } },
        { status: 400 }
      );
    }

    // 데이터 검증: 필수 필드 및 형식 체크
    if (typeof data.name !== "string") {
      return HttpResponse.json(
        { error: { statusCode: 422, message: "필수 필드가 누락되었습니다." } },
        { status: 422 }
      );
    }

    // params로 받은 categoryId에 해당하는 카테고리를 찾기
    const categoryIndex = categories.findIndex(
      (category) => category.categoryId === params.categoryId
    );

    if (categoryIndex === -1) {
      return HttpResponse.json(
        { error: { statusCode: 404, message: "해당 카테고리를 찾을 수 없습니다." } },
        { status: 404 }
      );
    }

    // 카테고리 이름 업데이트
    categories[categoryIndex].name = data.name;

    return HttpResponse.json({
      statusCode: 200,
      payload: { message: "카테고리가 성공적으로 수정되었습니다." },
    });
  }),
];
