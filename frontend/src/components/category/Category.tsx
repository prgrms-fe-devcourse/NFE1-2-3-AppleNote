import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchCategories, createCategory, CategoryResponse } from "./categoryApi"; // API 함수 가져오기

const Category: React.FC = () => {
  // 상태를 하나의 객체로 통합하여 관리하기 위한 정의
  const [state, setState] = useState<{
    categories: CategoryResponse["payload"];
    loading: boolean;
    error: string | null;
    newCategoryName: string;
    isInputVisible: boolean;
    isSubmitting: boolean;
  }>({
    categories: [],
    loading: true,
    error: null,
    newCategoryName: "",
    isInputVisible: false,
    isSubmitting: false,
  });

  // 카테고리 로드
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();

        setState((prev) => ({ ...prev, categories: data.payload }));
      } catch (error) {
        setState((prev) => ({ ...prev, error: (error as Error).message }));
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    };

    loadCategories();
  }, []);

  // 카테고리 추가 핸들러
  const handleAddCategory = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (!state.newCategoryName) {
        setState((prev) => ({ ...prev, error: "카테고리 이름을 입력해주세요." }));

        return;
      }

      if (state.isSubmitting) return; // 제출 중일 경우 추가 실행 방지

      setState((prev) => ({ ...prev, isSubmitting: true })); // 제출 시작
      try {
        await createCategory({ name: state.newCategoryName });

        const data = await fetchCategories();

        setState((prev) => ({ ...prev, categories: data.payload }));
        resetInput(); // 입력 필드 초기화
      } catch (error) {
        setState((prev) => ({ ...prev, error: (error as Error).message }));
      } finally {
        setState((prev) => ({ ...prev, isSubmitting: false })); // 제출 완료
      }
    }
  };

  // 입력 필드 초기화 함수
  const resetInput = () => {
    setState((prev) => ({ ...prev, newCategoryName: "", isInputVisible: false }));
  };

  // 버튼 클릭 핸들러
  const handleButtonClick = () => {
    setState((prev) => ({ ...prev, isInputVisible: true }));
  };

  // 입력 필드 블러 핸들러
  const handleInputBlur = () => {
    resetInput(); // 입력 필드 초기화
  };

  // 로딩 또는 에러 처리
  if (state.loading) return <div>Loading...</div>;
  if (state.error) return <div>Error: {state.error}</div>;

  return (
    <Container>
      <Title>Categories</Title>
      <Button disabled={state.isSubmitting} onClick={handleButtonClick}>
        +
      </Button>
      {state.isInputVisible && (
        <Input
          type="text"
          value={state.newCategoryName}
          onChange={(e) => setState((prev) => ({ ...prev, newCategoryName: e.target.value }))}
          onKeyDown={handleAddCategory}
          onBlur={handleInputBlur}
          placeholder="카테고리 이름 입력"
        />
      )}
      <List>
        {state.categories.map((category) => (
          <ListItem key={category.categoryId}>{category.name}</ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Category;

// 스타일링된 컴포넌트 정의
const Container = styled.div`
  padding: 0;
  border-radius: 8px;
  width: 130px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`;

const Button = styled.button`
  font-size: 20px;
  padding: 0;
  width: 130px;
  background-color: #ffffff;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
  }
`;

const Input = styled.input`
  font-size: 16px;
  padding: 5px;
  width: 100%;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  font-size: 16px;
`;

const ListItem = styled.li`
  padding: 5px;
  transition: background-color 0.3s;

  &:hover {
    opacity: 0.5;
  }
`;
