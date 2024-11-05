import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useLocation } from "react-router-dom";
import { fetchPostsByCategoryId, fetchPostsByPage, Post } from "./postApi";
import PaginationComponent from "../../common/components/PaginationComponent";
import HorizontalPostCard from "../../common/components/HorizontalPostCard";
import CategorySection from "../../common/components/CategorySection";
import DesktopCategoryWrapper from "../../common/components/DesktopCategoryWrapper";
import FaBarsWrapper from "../../common/components/FaBarsWrapper";
import Category from "@components/category/Category";

const PostListPage: React.FC = () => {
  const { categoryId: paramCategoryId } = useParams<{ categoryId?: string }>();
  const location = useLocation();

  // State 또는 URL 파라미터로부터 categoryId와 categoryName 설정
  const [categoryId, setCategoryId] = useState(
    location.state?.categoryId || paramCategoryId || null
  );
  const [categoryName, setCategoryName] = useState(location.state?.categoryName || "ALL");

  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSticky, setIsSticky] = useState(false);
  const [rightOffset, setRightOffset] = useState(0);
  const [initialRightOffset, setInitialRightOffset] = useState(0);
  const postsPerPage = 4;

  // 포스트 데이터 로드 함수 정의
  const loadPosts = async () => {
    try {
      const fetchedPosts = categoryId
        ? await fetchPostsByCategoryId(categoryId)
        : await fetchPostsByPage(1, Number.MAX_SAFE_INTEGER); // 전체 포스트 로드

      // 최신순으로 정렬된 데이터
      const sortedPosts = fetchedPosts.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setTotalPosts(sortedPosts.length); // 전체 포스트 수 설정

      // 현재 페이지에 해당하는 포스트 슬라이스
      const paginatedPosts = sortedPosts.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage
      );

      setPosts(paginatedPosts);
    } catch (error) {
      console.error("Failed to load posts:", error);
    }
  };

  // 카테고리 ID 또는 페이지 변경 시 포스트 로드
  useEffect(() => {
    loadPosts();
  }, [categoryId, currentPage]);

  useEffect(() => {
    const contentRow = document.getElementById("content-row");

    const handleScroll = () => {
      const contentRowRect = contentRow?.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      if (contentRowRect) {
        const initialRightSpace = viewportWidth - contentRowRect.right;

        setInitialRightOffset(initialRightSpace + 20);
        setRightOffset(isSticky ? initialRightSpace + 20 : 0);
        setIsSticky(contentRowRect.top <= 10);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSticky]);

  return (
    <Container>
      <CategorySection title={categoryName} small />
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
            setSelectedCategoryId={setCategoryId}
            setSelectedCategoryName={setCategoryName} // 카테고리 이름 설정 함수 전달
            onCategoryChange={loadPosts}
          />
        </DesktopCategoryWrapper>
        <FaBarsWrapper
          isSticky={isSticky}
          rightOffset={isSticky ? rightOffset : initialRightOffset}
          setSelectedCategoryId={setCategoryId}
          setSelectedCategoryName={setCategoryName}
          onCategoryChange={loadPosts}
        />
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
  width: 100%;
  max-width: 1205px;
  margin: 0 auto;
  padding: 1rem;
  padding-bottom: 2rem;

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

export default PostListPage;
