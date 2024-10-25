import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useCategory } from "@components/main/HomePage";
import { fetchPostsByCategoryId, Post } from "./postApi";
import HorizontalPostCard from "./HorizontalPostCard";
import { fetchCategories } from "../category/categoryApi";
import { useNavigate } from "react-router-dom";

const CategoryLatestPosts: React.FC = () => {
  const { selectedCategoryId, setSelectedCategoryId } = useCategory(); // 카테고리 상태 공유
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<{ categoryId: string; name: string }[]>([]);
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

  // 선택된 카테고리의 포스트 로드
  useEffect(() => {
    if (!selectedCategoryId) return;

    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPostsByCategoryId(selectedCategoryId);

        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to load posts:", error);
      }
    };

    loadPosts();
  }, [selectedCategoryId]);

  // MoreButton 클릭 시 해당 카테고리의 포스트 목록으로 이동
  const handleMoreButtonClick = () => {
    if (selectedCategoryId) {
      navigate(`/posts?category=${selectedCategoryId}`);
    }
  };

  return (
    <Container>
      <Header>
        <CategoryTitle>
          {categories.find((cat) => cat.categoryId === selectedCategoryId)?.name || "Category"}
        </CategoryTitle>
      </Header>

      <PostsGrid>
        {posts.map((post) => (
          <HorizontalPostCard key={post.postId} post={post} />
        ))}
      </PostsGrid>

      <MoreButton onClick={handleMoreButtonClick}>&gt;&gt;</MoreButton>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CategoryTitle = styled.h3`
  font-size: 2rem;
  font-weight: bold;
`;

const PostsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  margin-right: 20px;
  cursor: pointer;
  letter-spacing: -0.5rem;

  &:hover {
    opacity: 0.9;
  }
`;

export default CategoryLatestPosts;
