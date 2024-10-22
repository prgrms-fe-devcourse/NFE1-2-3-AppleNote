import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchCategories, createCategory, CategoryResponse } from "./categoryApi"; // API 함수 가져오기

const Category: React.FC = () => {
  // 상태 정의
  const [categories, setCategories] = useState<CategoryResponse["payload"]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [isInputVisible, setIsInputVisible] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // 카테고리 로드
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();

        setCategories(data.payload);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  // 카테고리 추가 핸들러
  const handleAddCategory = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (!newCategoryName) {
        setError("카테고리 이름을 입력해주세요.");

        return;
      }

      if (isSubmitting) return; // 제출 중일 경우 추가 실행 방지

      setIsSubmitting(true); // 제출 시작
      try {
        await createCategory({ name: newCategoryName });
        const data = await fetchCategories();

        setCategories(data.payload);
        resetInput(); // 입력 필드 초기화
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsSubmitting(false); // 제출 완료
      }
    }
  };

  // 입력 필드 초기화 함수
  const resetInput = () => {
    setNewCategoryName("");
    setIsInputVisible(false);
  };

  // 버튼 클릭 핸들러
  const handleButtonClick = () => {
    setIsInputVisible(true);
  };

  // 입력 필드 블러 핸들러
  const handleInputBlur = () => {
    resetInput(); // 입력 필드 초기화
  };

  // 로딩 또는 에러 처리
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container>
      <Title>Categories</Title>
      <Button disabled={isSubmitting} onClick={handleButtonClick}>
        +
      </Button>
      {isInputVisible && (
        <Input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          onKeyDown={handleAddCategory}
          onBlur={handleInputBlur}
          placeholder="카테고리 이름 입력"
        />
      )}
      <List>
        {categories.map((category) => (
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
  width: 150px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`;

const Button = styled.button`
  font-size: 20px;
  padding: 0;
  width: 150px;
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
