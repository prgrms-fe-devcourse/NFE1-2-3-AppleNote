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
const generateCategoryId = (): string => Math.random().toString(36).substring(2, 15);

// 공통 JSON 파싱 및 검증 함수
const parseAndValidateRequest = async (request: Request): Promise<CategoryAddRequest | null> => {
  try {
    const data = (await request.json()) as CategoryAddRequest;

    if (typeof data.name !== "string") throw new Error("필수 필드가 누락되었습니다.");

    return data;
  } catch {
    return null;
  }
};

// 공통 에러 응답 함수
const sendErrorResponse = (status: number, message: string) => {
  return HttpResponse.json({ error: { statusCode: status, message } }, { status });
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
    const data = await parseAndValidateRequest(request);

    if (!data) return sendErrorResponse(422, "잘못된 요청입니다.");

    const newCategory = { categoryId: generateCategoryId(), name: data.name };

    categories.push(newCategory);

    return HttpResponse.json({
      statusCode: 201,
      payload: { categoryId: newCategory.categoryId },
    });
  }),

  // 카테고리 수정 핸들러
  http.put("/categories/:categoryId", async ({ params, request }) => {
    const data = await parseAndValidateRequest(request);

    if (!data) return sendErrorResponse(422, "잘못된 요청입니다.");

    const categoryIndex = categories.findIndex((cat) => cat.categoryId === params.categoryId);

    if (categoryIndex === -1) return sendErrorResponse(404, "해당 카테고리를 찾을 수 없습니다.");

    categories[categoryIndex].name = data.name;

    return HttpResponse.json({
      statusCode: 200,
      payload: { message: "카테고리가 성공적으로 수정되었습니다." },
    });
  }),

  // 카테고리 삭제 핸들러
  http.delete("/categories/:categoryId", async ({ params }) => {
    const categoryIndex = categories.findIndex((cat) => cat.categoryId === params.categoryId);

    if (categoryIndex === -1) return sendErrorResponse(404, "해당 카테고리를 찾을 수 없습니다.");

    categories.splice(categoryIndex, 1);

    return HttpResponse.json({ statusCode: 200, payload: { isRemove: true } });
  }),
];
