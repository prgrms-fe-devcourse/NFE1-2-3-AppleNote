import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { fetchAllPosts, Post } from "../main/postApi";
import HorizontalPostCard from "../main/HorizontalPostCard";
import PaginationComponent from "../main/PaginationComponent";

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
      <SearchHeader>
        <FaSearch size={30} />
        <SearchResultText>"{searchQuery}"에 대한 검색 결과</SearchResultText>
      </SearchHeader>

      <PostsGrid>
        {paginatedPosts.map((post) => (
          <HorizontalPostCard key={post.postId} post={post} />
        ))}
      </PostsGrid>

      {filteredPosts.length === 0 && <NoResultsMessage>검색 결과가 없습니다.</NoResultsMessage>}
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

const SearchHeader = styled.div`
  display: flex; /* 수평 정렬을 위해 flex 사용 */
  align-items: center; /* 세로 가운데 정렬 */
  gap: 1rem; /* 아이콘과 텍스트 사이 여백 */
  margin-bottom: 2rem;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
`;

const SearchResultText = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin: 0; /* 기본 여백 제거 */
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
`;

const PostsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const NoResultsMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #777;
`;

export default SearchResultPage;
