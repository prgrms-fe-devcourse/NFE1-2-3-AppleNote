import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { fetchAllPosts, Post } from "@components/main/postApi";
import PaginationComponent from "@common/components/PaginationComponent";
import SearchResultHeader from "@components/search/SearchResultHeader";
import PostsGrid from "@components/search/PostsGrid";

const SearchResultPage: React.FC = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query") || ""; // 검색어 추출

  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  // 전체 포스트 가져오기
  useEffect(() => {
    const getPosts = async () => {
      try {
        const allPosts = await fetchAllPosts(); // 모든 포스트를 가져옴

        setPosts(allPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    getPosts();
  }, []);

  // 검색어에 맞게 필터링된 결과 설정
  useEffect(() => {
    const results = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredPosts(results);
  }, [searchQuery, posts]);

  // 현재 페이지에 해당하는 포스트 가져오기
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <Container>
      <SearchResultHeader searchQuery={searchQuery} />
      <PostsGrid posts={paginatedPosts} />

      {filteredPosts.length === 0 && <NoResultsMessage>No search results found.</NoResultsMessage>}
      {/* 페이지네이션 컴포넌트 */}
      <PaginationComponent
        totalPosts={filteredPosts.length}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Container>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const NoResultsMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #777;
`;

export default SearchResultPage;
