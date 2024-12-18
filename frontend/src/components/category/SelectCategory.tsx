import React, { useEffect, useReducer } from "react";
import styled from "styled-components";
import {
  fetchCategories,
  createCategory,
  CategoryResponse,
  updateCategory,
  deleteCategory,
  Category,
} from "./categoryApi"; // API 함수 가져오기
import { FaTrash } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

// 컴포넌트의 상태 유형 정의
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

// 상태 초기값 설정
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

// Reducer에서 사용할 액션의 종류 및 형태 정의
type Action =
  | { type: "SET_CATEGORIES"; payload: CategoryResponse["payload"] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "TOGGLE_COG_CLICKED" }
  | { type: "SET_NEW_CATEGORY_NAME"; payload: string }
  | { type: "TOGGLE_INPUT_VISIBLE"; payload: boolean }
  | { type: "SET_EDITING"; payload: { id: string | null; name: string } };

// Reducer 함수: 각 액션에 따라 상태 업데이트
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

type SelectCategoryProps = {
  selectedCategory: Category | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>;
};

const SelectCategory = ({ selectedCategory, setSelectedCategory }: SelectCategoryProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // API 호출에서 발생하는 에러 처리 함수
  const handleApiError = (error: unknown) => {
    const errorMessage = (error as Error).message || "에러가 발생했습니다.";

    dispatch({ type: "SET_ERROR", payload: errorMessage });
  };

  // 카테고리 데이터를 로드하고 상태를 업데이트하는 함수
  const reloadCategories = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const data = await fetchCategories();

      dispatch({ type: "SET_CATEGORIES", payload: data.payload });

      // 첫 번째 카테고리가 존재할 경우 선택된 카테고리로 설정
      if (!selectedCategory && data.payload.length > 0) {
        setSelectedCategory(data.payload[0]);
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  useEffect(() => {
    reloadCategories();
  }, []);

  // 라디오 버튼 선택 변경 함수
  const handleRadioChange = (category: Category) => {
    setSelectedCategory(category);
  };

  // 새 카테고리를 추가하는 함수: Enter 키 입력 시 실행
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
            <Radio
              type="radio"
              name="category"
              checked={selectedCategory?.categoryId === category.categoryId}
              onChange={() => handleRadioChange(category)}
            />
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

export default SelectCategory;

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
  align-items: center;
  justify-content: space-between;
`;

const Radio = styled.input`
  margin-right: 10px;
`;

const CategoryName = styled.span`
  flex-grow: 1;
  word-wrap: break-word;
  white-space: normal;
  overflow-wrap: break-word;
`;

const EditButton = styled(CiEdit)`
  margin-left: 10px;
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
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
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
  &:hover {
    opacity: 0.7;
  }
`;
