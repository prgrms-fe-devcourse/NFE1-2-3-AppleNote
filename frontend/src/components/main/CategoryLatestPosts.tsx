import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useCategory } from "@components/main/HomePage";
import { fetchLatestPostsByCategoryId, Post } from "./postApi";
import HorizontalPostCard from "./HorizontalPostCard";
import { fetchCategories } from "../category/categoryApi";
import { useNavigate } from "react-router-dom";
import CategorySection from "./CategorySection";
import MoreButton from "@common/components/MoreButton";

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

  return (
    <Container>
      <Header>
        <CategorySection title={selectedCategoryName} /> {/* CategorySection 적용 */}
        <AlignedMoreButton onClick={handleMoreButtonClick} />
      </Header>

      <PostsGrid>
        {posts.map((post) => (
          <HorizontalPostCard key={post.postId} post={post} />
        ))}
      </PostsGrid>
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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

// MoreButton에 스타일 확장 적용
const AlignedMoreButton = styled(MoreButton)`
  align-self: flex-end; /* 버튼을 오른쪽으로 정렬 */
`;

const PostsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-right: 3rem; /* MoreButton 크기만큼 오른쪽 여백 추가 */
  max-width: 100%; /* 목록의 최대 너비 */
  min-width: 0; /* 화면 너비에 맞춰 줄어듦 */

  @media (max-width: 768px) {
    margin-right: 0; /* 모바일에서는 오른쪽 여백 제거 */
    padding: 0 1rem;
  }
`;

export default CategoryLatestPosts;
