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
  const { selectedCategoryId, setSelectedCategoryId } = useCategory();
  const [selectedCategoryName, setSelectedCategoryName] = useState("Category");
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<{ categoryId: string; name: string }[]>([]);
  const [isSticky, setIsSticky] = useState(false);
  const [rightOffset, setRightOffset] = useState(0);
  const [initialRightOffset, setInitialRightOffset] = useState(0);
  const navigate = useNavigate();

  const loadPosts = async (categoryId: string) => {
    try {
      const fetchedPosts = await fetchLatestPostsByCategoryId(categoryId);

      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Failed to load posts:", error);
    }
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();

        setCategories(data.payload);

        if (data.payload.length > 0) {
          const initialCategoryId = data.payload[0].categoryId;

          setSelectedCategoryId(initialCategoryId);
          setSelectedCategoryName(data.payload[0].name);
          loadPosts(initialCategoryId);
        }
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };

    loadCategories();
  }, [setSelectedCategoryId]);

  useEffect(() => {
    if (selectedCategoryId) {
      loadPosts(selectedCategoryId);
      const category = categories.find((cat) => cat.categoryId === selectedCategoryId);

      if (category) setSelectedCategoryName(category.name);
    }
  }, [selectedCategoryId, categories]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    const category = categories.find((cat) => cat.categoryId === categoryId);

    if (category) setSelectedCategoryName(category.name);
    loadPosts(categoryId);
  };

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
          {posts.length > 0 ? (
            posts.map((post) => <HorizontalPostCard key={post.postId} post={post} />)
          ) : (
            <NoPostsMessage>No registered post exists yet.</NoPostsMessage>
          )}
        </HorizontalPostGrid>
        <DesktopCategoryWrapper marginTop={0}>
          <Category
            setSelectedCategoryId={handleCategorySelect}
            setSelectedCategoryName={setSelectedCategoryName}
            onCategoryChange={() => selectedCategoryId && loadPosts(selectedCategoryId)}
          />
        </DesktopCategoryWrapper>
        <FaBarsWrapper
          isSticky={isSticky}
          rightOffset={isSticky ? rightOffset : initialRightOffset}
          setSelectedCategoryId={handleCategorySelect}
          setSelectedCategoryName={setSelectedCategoryName}
          onCategoryChange={() => selectedCategoryId && loadPosts(selectedCategoryId)}
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

const NoPostsMessage = styled.div`
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  padding: 2rem;
`;

export default CategoryLatestPosts;
