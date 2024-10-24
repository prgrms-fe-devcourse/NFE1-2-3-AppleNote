import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { fetchPostsByPage, fetchPostsByCategory, Post } from "./postApi";
import Category from "../category/Category";
import PaginationComponent from "./PaginationComponent";
import HorizontalPostCard from "./HorizontalPostCard";
import CategorySection from "./CategorySection";

const PostListPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName?: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  // 포스트 데이터 로드
  useEffect(() => {
    const loadPosts = async () => {
      try {
        let fetchedPosts: Post[];

        if (categoryName) {
          // 특정 카테고리 포스트 가져오기
          fetchedPosts = await fetchPostsByCategory(categoryName, currentPage, postsPerPage);
        } else {
          // 전체 포스트 가져오기
          fetchedPosts = await fetchPostsByPage(currentPage, postsPerPage);
        }

        setPosts(fetchedPosts);

        // 전체 포스트 수 업데이트
        const totalFetchedPosts = categoryName
          ? await fetchPostsByCategory(categoryName, 1, Number.MAX_SAFE_INTEGER)
          : await fetchPostsByPage(1, Number.MAX_SAFE_INTEGER);

        setTotalPosts(totalFetchedPosts.length);
      } catch (error) {
        console.error("Failed to load posts:", error);
      }
    };

    loadPosts();
  }, [categoryName, currentPage]);

  return (
    <Container>
      <CategorySection title={categoryName || "전체 포스트"} />
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
  margin: 0 auto;
  padding: 1rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const HorizontalPostGrid = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const CategoryWrapper = styled.div`
  width: 20%;
`;

export default PostListPage;
