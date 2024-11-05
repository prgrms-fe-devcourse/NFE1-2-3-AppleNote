import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useCategory } from "@components/main/HomePage";
import { fetchLatestPostsByCategoryId, Post } from "@components/main/postApi";
import HorizontalPostCard from "@common/components/HorizontalPostCard";
import { fetchCategories } from "@components/category/categoryApi";
import { useNavigate } from "react-router-dom";
import CategorySection from "@common/components/CategorySection";
import DesktopCategoryWrapper from "@common/components/DesktopCategoryWrapper";
import FaBarsWrapper from "@common/components/FaBarsWrapper";
import Category from "@components/category/Category";
import MoreButton from "@common/components/MoreButton";

const CategoryLatestPosts: React.FC = () => {
  const { selectedCategoryId, setSelectedCategoryId } = useCategory();
  const [selectedCategoryName, setSelectedCategoryName] = useState("Category");
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<{ categoryId: string; name: string }[]>([]);
  const [isSticky, setIsSticky] = useState(false);
  const [rightOffset, setRightOffset] = useState(0);
  const [initialRightOffset, setInitialRightOffset] = useState(0);
  const navigate = useNavigate();

  // 카테고리 선택 시 호출하는 함수
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    const category = categories.find((cat) => cat.categoryId === categoryId);

    if (category) {
      setSelectedCategoryName(category.name);
      loadPosts(categoryId); // 선택된 카테고리의 포스트를 즉시 로드
    }
  };

  // 카테고리 목록과 초기 상태를 로드하는 함수
  const loadCategories = async () => {
    try {
      const data = await fetchCategories();

      setCategories(data.payload);

      // 첫 번째 카테고리를 초기 선택으로 설정
      if (data.payload.length > 0) {
        const initialCategoryId = data.payload[0].categoryId;

        setSelectedCategoryId(initialCategoryId);
        setSelectedCategoryName(data.payload[0].name);
        loadPosts(initialCategoryId); // 초기 선택된 카테고리의 포스트 로드
      }
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // 카테고리가 선택되거나 생성된 후 포스트를 로드
  const loadPosts = async (categoryId: string) => {
    try {
      const fetchedPosts = await fetchLatestPostsByCategoryId(categoryId);

      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Failed to load posts:", error);
    }
  };

  // MoreButton 클릭 시 해당 카테고리 페이지로 이동
  const handleMoreButtonClick = () => {
    if (selectedCategoryId) {
      navigate(`/posts`, {
        state: { categoryId: selectedCategoryId, categoryName: selectedCategoryName },
      });
    }
  };

  useEffect(() => {
    const contentRow = document.getElementById("content-row");

    const handleScroll = () => {
      const contentRowRect = contentRow?.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      if (contentRowRect) {
        const initialRightSpace = viewportWidth - contentRowRect.right;

        setInitialRightOffset(initialRightSpace + 14.5);
        setRightOffset(isSticky ? initialRightSpace + 30 : 0);
        setIsSticky(contentRowRect.top <= -200);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSticky]);

  // 카테고리 변경 시 호출될 함수
  const onCategoryChange = (categoryId: string, categoryName: string) => {
    setSelectedCategoryId(categoryId);
    setSelectedCategoryName(categoryName);
    loadPosts(categoryId);
  };

  return (
    <Container>
      <CategorySection title={selectedCategoryName} small />
      <MoreButtonContainer>
        <MoreButton onClick={handleMoreButtonClick} />
      </MoreButtonContainer>
      <ContentWrapper id="content-row">
        <HorizontalPostGrid>
          {posts.length > 0 ? (
            posts.map((post) => <HorizontalPostCard key={post.postId} post={post} />)
          ) : (
            <NoPostsMessage>해당 카테고리에는 아직 포스트가 존재하지 않습니다.</NoPostsMessage>
          )}
        </HorizontalPostGrid>
        <DesktopCategoryWrapper marginTop={0}>
          <Category
            setSelectedCategoryId={handleCategorySelect}
            setSelectedCategoryName={setSelectedCategoryName}
            onCategoryChange={onCategoryChange}
          />
        </DesktopCategoryWrapper>
        <FaBarsWrapper
          isSticky={isSticky}
          rightOffset={isSticky ? rightOffset : initialRightOffset}
          setSelectedCategoryId={handleCategorySelect}
          setSelectedCategoryName={setSelectedCategoryName}
          onCategoryChange={onCategoryChange}
        />
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 1205px;
  margin: 0 auto;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  margin-top: 80px;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const MoreButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const HorizontalPostGrid = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-right: 50px;
`;

// NoPostsMessage 스타일 추가
const NoPostsMessage = styled.div`
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  padding: 2rem;
`;

export default CategoryLatestPosts;
