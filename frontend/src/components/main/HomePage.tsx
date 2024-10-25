import React, { createContext, useContext, useState } from "react";
import styled from "styled-components";
import useCustomTheme from "@common/styles/useCustomTheme";
import Category from "@components/category/Category";
import LatestPosts from "@components/main/LatestPosts";
import CategoryLatestPosts from "@components/main/CategoryLatestPosts";

// Context 생성과 기본값 제공
interface CategoryContextProps {
  selectedCategoryId: string | null;
  setSelectedCategoryId: (id: string) => void;
}

const CategoryContext = createContext<CategoryContextProps | undefined>(undefined);

// Context 사용 Hook
export const useCategory = () => {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }

  return context;
};

interface HomePageProps {
  data?: null;
}

const HomePage: React.FC<HomePageProps> = () => {
  const { toggleTheme, themeType } = useCustomTheme();

  const icon = themeType === "light" ? "🍎" : "🍏";

  // 선택된 카테고리 ID와 업데이트 함수
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const onClickHandler = () => {
    toggleTheme();
  };

  return (
    <CategoryContext.Provider value={{ selectedCategoryId, setSelectedCategoryId }}>
      <Container>
        <LatestPosts />
        <CategoryLatestPosts />
        <Category /> {/* Category 컴포넌트에서 클릭 시 선택된 카테고리 ID 설정 */}
        <h1>
          {icon} Hello World {icon}
        </h1>
        <StyledButton onClick={onClickHandler}>Click Me!</StyledButton>
      </Container>
    </CategoryContext.Provider>
  );
};

const Container = styled.div`
  padding: 2rem;
`;

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  background-color: ${({ theme }) => theme.buttonBgColor};
  color: ${({ theme }) => theme.buttonTextColor};
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  &:hover {
    opacity: 0.9;
  }

  &:focus {
    outline: none;
  }
`;

export default HomePage;
