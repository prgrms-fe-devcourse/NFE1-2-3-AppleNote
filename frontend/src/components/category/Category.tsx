import React, { useEffect, useReducer } from "react";
import styled from "styled-components";
import {
  fetchCategories,
  createCategory,
  CategoryResponse,
  updateCategory,
  deleteCategory,
} from "./categoryApi"; // API 함수 가져오기
import { FaCog, FaTrash } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

type CategoryState = {
  categories: CategoryResponse["payload"];
  loading: boolean;
  error: string | null;
  newCategoryName: string;
  isInputVisible: boolean;
  isEditing: string | null;
  editCategoryName: string;
  cogClicked: boolean;
};

const initialState: CategoryState = {
  categories: [],
  loading: true,
  error: null,
  newCategoryName: "",
  isInputVisible: false,
  isEditing: null,
  editCategoryName: "",
  cogClicked: false,
};

type Action =
  | { type: "SET_CATEGORIES"; payload: CategoryResponse["payload"] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "TOGGLE_COG_CLICKED" }
  | { type: "SET_NEW_CATEGORY_NAME"; payload: string }
  | { type: "TOGGLE_INPUT_VISIBLE"; payload: boolean }
  | { type: "SET_EDITING"; payload: { id: string | null; name: string } };

const reducer = (state: CategoryState, action: Action): CategoryState => {
  switch (action.type) {
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "TOGGLE_COG_CLICKED":
      return { ...state, cogClicked: !state.cogClicked };
    case "SET_NEW_CATEGORY_NAME":
      return { ...state, newCategoryName: action.payload };
    case "TOGGLE_INPUT_VISIBLE":
      return { ...state, isInputVisible: action.payload };
    case "SET_EDITING":
      return {
        ...state,
        isEditing: action.payload.id,
        editCategoryName: action.payload.name,
      };
    default:
      return state;
  }
};

const Category: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleApiError = (error: unknown) => {
    const errorMessage = (error as Error).message || "에러가 발생했습니다.";

    dispatch({ type: "SET_ERROR", payload: errorMessage });
  };

  // 카테고리 로드
  const reloadCategories = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const data = await fetchCategories();

      dispatch({ type: "SET_CATEGORIES", payload: data.payload });
    } catch (error) {
      handleApiError(error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  useEffect(() => {
    reloadCategories();
  }, []);

  const handleAddCategory = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && state.newCategoryName) {
      try {
        await createCategory({ name: state.newCategoryName });
        await reloadCategories();
        dispatch({ type: "SET_NEW_CATEGORY_NAME", payload: "" });
        dispatch({ type: "TOGGLE_INPUT_VISIBLE", payload: false });
      } catch (error) {
        handleApiError(error);
      }
    }
  };

  const handleButtonClick = () => {
    dispatch({ type: "TOGGLE_INPUT_VISIBLE", payload: true });
  };

  const handleInputBlur = () => {
    dispatch({ type: "SET_NEW_CATEGORY_NAME", payload: "" });
    dispatch({ type: "TOGGLE_INPUT_VISIBLE", payload: false });
  };

  const handleCogClick = () => {
    dispatch({ type: "TOGGLE_COG_CLICKED" });
  };

  const handleEditCategory = (categoryId: string, newName: string) => {
    dispatch({ type: "SET_EDITING", payload: { id: categoryId, name: newName } });
  };

  const handleEditKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>,
    categoryId: string
  ) => {
    if (event.key === "Enter" && state.editCategoryName) {
      try {
        await updateCategory({
          categoryId,
          name: state.editCategoryName,
        });
        await reloadCategories();
        dispatch({ type: "SET_EDITING", payload: { id: null, name: "" } });
      } catch (error) {
        handleApiError(error);
      }
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (window.confirm("이 카테고리를 삭제하시겠습니까?")) {
      try {
        await deleteCategory(categoryId);
        await reloadCategories();
      } catch (error) {
        handleApiError(error);
      }
    }
  };

  const handleEditBlur = () => {
    dispatch({ type: "SET_EDITING", payload: { id: null, name: "" } });
  };

  if (state.loading) return <div>Loading...</div>;
  if (state.error) return <div>Error: {state.error}</div>;

  return (
    <Container>
      <Header>
        <Title>Categories</Title>
        <CogIcon onClick={handleCogClick} />
      </Header>
      <Button disabled={state.loading} onClick={handleButtonClick}>
        +
      </Button>
      {state.isInputVisible && (
        <Input
          type="text"
          value={state.newCategoryName}
          onChange={(e) => dispatch({ type: "SET_NEW_CATEGORY_NAME", payload: e.target.value })}
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
                  dispatch({
                    type: "SET_EDITING",
                    payload: { id: category.categoryId, name: e.target.value },
                  })
                }
                onKeyDown={(e) => handleEditKeyPress(e, category.categoryId)}
                onBlur={handleEditBlur}
              />
            ) : (
              <CategoryName>{category.name}</CategoryName>
            )}
            {state.cogClicked && !state.isEditing && (
              <>
                <EditButton onClick={() => handleEditCategory(category.categoryId, category.name)}>
                  <CiEdit />
                </EditButton>
                <DeleteButton onClick={() => handleDeleteCategory(category.categoryId)}>
                  <FaTrash />
                </DeleteButton>
              </>
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
  stroke-width: 0.5;

  &:hover {
    opacity: 0.5;
  }
`;

const DeleteButton = styled(MdDeleteOutline)`
  background: none;
  border: none;
  cursor: pointer;
  width: 24px; // 버튼 너비 고정
  height: 24px; // 버튼 높이 고정
  min-width: 24px; // 최소 너비 설정
  min-height: 24px; // 최소 높이 설정
  &:hover {
    opacity: 0.7;
  }
`;
