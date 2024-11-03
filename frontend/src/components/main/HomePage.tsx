import React, { createContext, useContext, useState } from "react";
import styled from "styled-components";
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

const HomePage: React.FC = () => {
  // 선택된 카테고리 ID와 업데이트 함수
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  return (
    <CategoryContext.Provider value={{ selectedCategoryId, setSelectedCategoryId }}>
      <Container>
        <ContentWrapper>
          <LatestPosts />
        </ContentWrapper>
        <ContentWrapper>
          <ContentRow id="content-row">
            <CategoryLatestPosts />
          </ContentRow>
        </ContentWrapper>
      </Container>
    </CategoryContext.Provider>
  );
};

const Container = styled.div`
  padding: 0;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto; /* 화면 중앙 정렬 */
  padding: 0 16px; /* 양쪽 여백 추가로 중앙 정렬 유지 */

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0;
    justify-content: flex-start; /* 모바일에서는 왼쪽 정렬 */
  }
`;

const ContentRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
  gap: 2rem;
  width: 100%;
  max-width: 1000px;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start; /* 모바일에서 왼쪽 정렬 */
    padding: 0;
  }
`;

export default HomePage;
