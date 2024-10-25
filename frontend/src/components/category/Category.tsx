import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchCategories, createCategory, CategoryResponse, updateCategory } from "./categoryApi"; // API 함수 가져오기
import { FaCog } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";

const Category: React.FC = () => {
  // 상태를 하나의 객체로 통합하여 관리하기 위한 정의
  const [state, setState] = useState<{
    categories: CategoryResponse["payload"];
    loading: boolean;
    error: string | null;
    newCategoryName: string;
    isInputVisible: boolean;
    isSubmitting: boolean;
    isEditing: string | null; // 수정 중인 카테고리 ID
    editCategoryName: string;
    cogClicked: boolean; // 수정 모드인지 확인
  }>({
    categories: [],
    loading: true,
    error: null,
    newCategoryName: "",
    isInputVisible: false,
    isSubmitting: false,
    isEditing: null, // 수정 모드
    editCategoryName: "",
    cogClicked: false, // 수정 모드인지 확인
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

  const handleCogClick = () => {
    setState((prev) => ({ ...prev, cogClicked: !prev.cogClicked }));
  };

  const handleEditCategory = (categoryId: string, newName: string) => {
    // 해당 카테고리 수정 로직 추가
    setState((prev) => ({
      ...prev,
      isEditing: categoryId,
      editCategoryName: newName,
    }));
  };

  const handleEditKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>,
    categoryId: string
  ) => {
    if (event.key === "Enter" && state.editCategoryName) {
      try {
        // 서버에 카테고리 수정 요청
        await updateCategory({
          categoryId,
          name: state.editCategoryName, // 수정된 이름을 전송
        });

        // 수정 후 로컬 상태 업데이트
        const updatedCategories = state.categories.map((category) =>
          category.categoryId === categoryId
            ? { ...category, name: state.editCategoryName }
            : category
        );

        // 수정 완료 후 수정 모드 해제
        setState((prev) => ({
          ...prev,
          categories: updatedCategories,
          isEditing: null,
          editCategoryName: "",
        }));
      } catch (error) {
        console.error("카테고리 수정 중 오류 발생:", error);
        setState((prev) => ({ ...prev, error: "카테고리 수정 중 오류가 발생했습니다." }));
      }
    }
  };

  const handleEditBlur = () => {
    setState((prev) => ({ ...prev, isEditing: null }));
  };

  // 로딩 또는 에러 처리
  if (state.loading) return <div>Loading...</div>;
  if (state.error) return <div>Error: {state.error}</div>;

  return (
    <Container>
      <Header>
        <Title>Categories</Title>
        <CogIcon onClick={handleCogClick} />
      </Header>
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
          <ListItem key={category.categoryId}>
            {state.isEditing === category.categoryId ? (
              <Input
                type="text"
                value={state.editCategoryName}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, editCategoryName: e.target.value }))
                }
                onKeyDown={(e) => handleEditKeyPress(e, category.categoryId)}
                onBlur={handleEditBlur}
              />
            ) : (
              <CategoryName>{category.name}</CategoryName>
            )}
            {state.cogClicked && !state.isEditing && (
              <EditButton
                onClick={() => handleEditCategory(category.categoryId, category.name)}></EditButton>
            )}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Category;

const Container = styled.div`
  padding: 0;
  border-radius: 8px;
  width: 130px;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin-right: 5px;
`;

const CogIcon = styled(FaCog)`
  margin-top: 5px; /* 아이콘을 아래로 10px 내림 */
  cursor: pointer;
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
  display: flex;
  align-items: center; // 수직 정렬
  justify-content: space-between; // 여백을 자동으로 분배
`;

const CategoryName = styled.span`
  flex-grow: 1; // 가능한 공간을 모두 차지하게 설정
  word-wrap: break-word; // 단어 줄바꿈 설정
  white-space: normal; // 줄바꿈을 허용하도록 설정
  overflow-wrap: break-word; // 단어가 너무 길 경우 줄바꿈
`;

const EditButton = styled(CiEdit)`
  margin-left: 10px;
  width: 24px; // 버튼 너비 고정
  height: 24px; // 버튼 높이 고정
  min-width: 24px; // 최소 너비 설정
  min-height: 24px; // 최소 높이 설정
  cursor: pointer;

  &:hover {
    background-color: #ccc;
  }
`;
