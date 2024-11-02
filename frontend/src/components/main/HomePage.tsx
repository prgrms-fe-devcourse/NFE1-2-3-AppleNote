import React, { createContext, useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
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

const HomePage: React.FC = () => {
  // 선택된 카테고리 ID와 업데이트 함수
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [rightOffset, setRightOffset] = useState(0);
  const [initialRightOffset, setInitialRightOffset] = useState(0);

  const toggleCategory = () => {
    setIsCategoryVisible(!isCategoryVisible);
  };

  useEffect(() => {
    const contentRow = document.getElementById("content-row");

    const handleScroll = () => {
      const contentRowRect = contentRow?.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      if (contentRowRect) {
        const initialRightSpace = viewportWidth - contentRowRect.right;

        setInitialRightOffset(initialRightSpace - 16);
        setRightOffset(isSticky ? initialRightSpace + 10 : 0); // 스크롤 중 위치 일치
        setIsSticky(contentRowRect.top <= 20);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSticky]);

  return (
    <CategoryContext.Provider value={{ selectedCategoryId, setSelectedCategoryId }}>
      <Container>
        <ContentWrapper>
          <LatestPosts />
        </ContentWrapper>
        <ContentWrapper>
          <ContentRow id="content-row">
            <ResponsiveCategoryLatestPosts />
            <DesktopCategoryWrapper>
              <Category />
            </DesktopCategoryWrapper>
            <FaBarsWrapper
              isSticky={isSticky}
              rightOffset={isSticky ? rightOffset : initialRightOffset}
              onClick={toggleCategory}>
              <FaBars size={24} />
              {isCategoryVisible && (
                <Dropdown>
                  <Category />
                </Dropdown>
              )}
            </FaBarsWrapper>
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
    padding: 0 10px; /* 작은 화면에서는 여백 줄임 */
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
    gap: 1rem;
    max-width: 100%;
  }
`;

const ResponsiveCategoryLatestPosts = styled(CategoryLatestPosts)`
  flex: 1;
  max-width: 800px; /* 기본 너비 */

  @media (max-width: 1024px) {
    max-width: 600px; /* 더 작은 화면에서 너비 줄임 */
  }

  @media (max-width: 768px) {
    max-width: 100%; /* 모바일에서 전체 너비 사용 */
  }
`;

// Desktop 화면에서만 카테고리 보이기
const DesktopCategoryWrapper = styled.div`
  display: block;
  margin-top: 200px; /* 원하는 위치만큼 아래로 이동 */

  @media (max-width: 768px) {
    display: none; /* 작은 화면에서는 숨기기 */
  }
`;

const FaBarsWrapper = styled.div<{ isSticky: boolean; rightOffset: number }>`
  position: ${({ isSticky }) => (isSticky ? "fixed" : "absolute")};
  top: ${({ isSticky }) => (isSticky ? "20px" : "auto")};
  right: ${({ rightOffset }) => `${rightOffset}px`};
  cursor: pointer;
  z-index: 20;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  background: ${({ theme }) => theme.background.secondary};
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: ${({ theme }) => theme.boxShadow.primary};
  border-radius: 8px;
  padding: 1rem;
  width: 220px;
  z-index: 10;
`;

export default HomePage;
