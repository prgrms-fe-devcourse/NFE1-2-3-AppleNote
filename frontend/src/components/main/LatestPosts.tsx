import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { fetchLatestPosts, Post } from "./postApi";

const LatestPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  // 최신 포스트 가져오기
  useEffect(() => {
    const getPosts = async () => {
      try {
        const fetchedPosts = await fetchLatestPosts();

        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    getPosts();
  }, []);

  // 포스트 클릭 핸들러
  const handlePostClick = (postId: string) => {
    navigate(`/posts/${postId}`);
  };

  // MoreButton 클릭 핸들러
  const handleMoreButtonClick = () => {
    navigate("/posts"); // 전체 포스트 목록 페이지로 이동
  };

  return (
    <Container>
      <Header>
        <Title>LATEST POSTS</Title>
        <MoreButton onClick={handleMoreButtonClick}>&gt;&gt;</MoreButton>
      </Header>
      <PostsGrid>
        {posts.map((post) => (
          <PostCard key={post.postId} onClick={() => handlePostClick(post.postId)}>
            <Thumbnail src={post.images[0]} alt={post.title} />
            <PostTitle>{post.title}</PostTitle>
            <PostContent>{post.content}</PostContent>
          </PostCard>
        ))}
      </PostsGrid>
      <Divider />
    </Container>
  );
};

const Container = styled.div`
  width: 1205px;
  margin: 0 auto;
  padding: 1rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 1rem;
  position: relative;
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-left: 20px;
  align-self: flex-start;
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  margin-right: 20px;
  cursor: pointer;
  letter-spacing: -0.5rem;

  &:hover {
    opacity: 0.6;
  }
`;

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 369px);
  gap: 1.5rem;
  justify-content: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PostCard = styled.div`
  width: 369px;
  display: flex;
  flex-direction: column;
  padding: 1rem;

  &:hover {
    transform: scale(1.02);
    transition: transform 0.2s;
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const PostTitle = styled.h3`
  margin: 1rem 0 0.5rem;
  font-size: 1.5rem;
`;

const PostContent = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Divider = styled.hr`
  margin: 7rem 0;
  border: none;
  border-top: 1px solid #000;
`;

export default LatestPosts;
