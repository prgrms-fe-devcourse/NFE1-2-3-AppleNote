import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useCategory } from "@components/main/HomePage";
import { fetchLatestPostsByCategoryId, Post } from "./postApi";
import HorizontalPostCard from "../../common/components/HorizontalPostCard";
import { fetchCategories } from "../category/categoryApi";
import { useNavigate } from "react-router-dom";
import CategorySection from "../../common/components/CategorySection";
import DesktopCategoryWrapper from "../../common/components/DesktopCategoryWrapper";
import FaBarsWrapper from "../../common/components/FaBarsWrapper";
import Category from "@components/category/Category";
import MoreButton from "@common/components/MoreButton";

const CategoryLatestPosts: React.FC = () => {
  const { selectedCategoryId, setSelectedCategoryId } = useCategory(); // 카테고리 상태 공유
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<{ categoryId: string; name: string }[]>([]);
  const [isSticky, setIsSticky] = useState(false);
  const [rightOffset, setRightOffset] = useState(0);
  const [initialRightOffset, setInitialRightOffset] = useState(0);
  const navigate = useNavigate();

  // 최상단 카테고리를 기본 선택
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();

        setCategories(data.payload);

        if (data.payload.length > 0) {
          setSelectedCategoryId(data.payload[0].categoryId); // 첫 번째 카테고리 기본 선택
        }
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };

    loadCategories();
  }, [setSelectedCategoryId]);

  // 선택된 카테고리의 포스트 4개 로드
  useEffect(() => {
    if (!selectedCategoryId) return;

    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchLatestPostsByCategoryId(selectedCategoryId);

        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to load posts:", error);
      }
    };

    loadPosts();
  }, [selectedCategoryId]);

  // MoreButton 클릭 시 해당 카테고리의 포스트 목록으로 이동
  const handleMoreButtonClick = () => {
    const category = categories.find((cat) => cat.categoryId === selectedCategoryId);

    if (category) {
      navigate(`/categories/${category.categoryId}`, {
        state: {
          categoryId: category.categoryId,
          categoryName: category.name,
        },
      });
    }
  };

  const selectedCategoryName =
    categories.find((cat) => cat.categoryId === selectedCategoryId)?.name || "Category";

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

  return (
    <Container>
      <CategorySection title={selectedCategoryName} small />
      <MoreButtonContainer>
        <MoreButton onClick={handleMoreButtonClick} />
      </MoreButtonContainer>
      <ContentWrapper id="content-row">
        <HorizontalPostGrid>
          {posts.map((post) => (
            <HorizontalPostCard key={post.postId} post={post} />
          ))}
        </HorizontalPostGrid>
        <DesktopCategoryWrapper marginTop={0}>
          <Category />
        </DesktopCategoryWrapper>
        <FaBarsWrapper
          isSticky={isSticky}
          rightOffset={isSticky ? rightOffset : initialRightOffset}
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

export default CategoryLatestPosts;
