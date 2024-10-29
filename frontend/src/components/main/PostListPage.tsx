import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useLocation } from "react-router-dom";
import { fetchPostsByPage, fetchPostsByCategoryId, Post } from "./postApi";
import Category from "../category/Category";
import PaginationComponent from "../../common/components/PaginationComponent";
import HorizontalPostCard from "./HorizontalPostCard";
import CategorySection from "./CategorySection";

const PostListPage: React.FC = () => {
  const { categoryId: paramCategoryId } = useParams<{ categoryId?: string }>();
  const location = useLocation();

  // State 또는 URL 파라미터로부터 categoryId와 categoryName 설정
  const categoryId = location.state?.categoryId || paramCategoryId || null;
  const categoryName = location.state?.categoryName || "전체 포스트";

  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  // 포스트 데이터 로드
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = categoryId
          ? await fetchPostsByCategoryId(categoryId) // 카테고리별 포스트 로드
          : await fetchPostsByPage(1, Number.MAX_SAFE_INTEGER); // 전체 포스트 로드

        setTotalPosts(fetchedPosts.length); // 전체 포스트 수 설정

        // 현재 페이지에 해당하는 포스트만 슬라이스
        const paginatedPosts = fetchedPosts.slice(
          (currentPage - 1) * postsPerPage,
          currentPage * postsPerPage
        );

        setPosts(paginatedPosts);
      } catch (error) {
        console.error("Failed to load posts:", error);
      }
    };

    loadPosts();
  }, [categoryId, currentPage]);

  return (
    <Container>
      <CategorySection title={categoryName} small /> {/* 작은 크기로 표시 */}
      <ContentWrapper>
        <HorizontalPostGrid>
          {posts.map((post) => (
            <HorizontalPostCard key={post.postId} post={post} />
          ))}
        </HorizontalPostGrid>
        <CategoryWrapper>
          <Category />
        </CategoryWrapper>
      </ContentWrapper>
      <PaginationComponent
        totalPosts={totalPosts}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 1205px;
  margin: 40px auto 0;
  padding: 1rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 80px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const HorizontalPostGrid = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const CategoryWrapper = styled.div`
  width: 20%;
  box-sizing: border-box;
  position: sticky; /* 스크롤 시 고정 */
  top: 20px; /* 화면 상단에서 떨어진 위치 */
  align-self: flex-start; /* 상단에 정렬 */
`;

export default PostListPage;
