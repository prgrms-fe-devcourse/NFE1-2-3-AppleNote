import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { fetchLatestPosts, Post } from "./postApi";
import MoreButton from "@common/components/MoreButton";
import DefaultThumbnail from "../../assets/images/default-thumbnail.jpg";

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

  // 썸네일 이미지 소스를 가져오는 함수
  const getThumbnailSrc = (images: string[]): string => {
    return images[0] || DefaultThumbnail;
  };

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
        <MoreButton onClick={handleMoreButtonClick} />
      </Header>
      <PostsGridWrapper>
        {posts.length > 0 ? (
          <PostsGrid>
            {posts.map((post) => (
              <PostCard key={post.postId} onClick={() => handlePostClick(post.postId)}>
                <Thumbnail src={getThumbnailSrc(post.images)} alt={post.title} />
                <PostTitle>{post.title}</PostTitle>
                <PostContent>{post.content}</PostContent>
              </PostCard>
            ))}
          </PostsGrid>
        ) : (
          <NoPostsMessage>아직 등록된 포스트가 존재하지 않습니다.</NoPostsMessage>
        )}
      </PostsGridWrapper>
      <Divider />
    </Container>
  );
};

const Container = styled.div`
  width: 1205px;
  min-width: 500px;
  margin: 0;
  @media (max-width: 1205px) {
    width: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 1rem;
  position: relative;
  width: 100%;
  max-width: 1205px;
`;

const Title = styled.h2`
  font-size: clamp(3.5rem, 5vw, 6rem);
  font-weight: bold;
  margin-bottom: 3rem;
  margin-left: 20px;
  align-self: flex-start;
`;

/* PostsGrid를 중앙 정렬하고 양 옆에 여백을 추가 */
const PostsGridWrapper = styled.div`
  display: flex;
  justify-content: center; /* 그리드 전체를 중앙 정렬 */
  padding: 0;
`;

const PostsGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  justify-content: center; /* 가로 가운데 정렬 */
  align-items: center; /* 세로 가운데 정렬 */
  padding: 0 16px;

  /* 기본 3개씩 */
  grid-template-columns: repeat(3, minmax(0, 1fr));

  /* 화면 너비가 줄어들 때 2개로 조정 */
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  /* 더 좁아지면 1개로 조정 */
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const PostCard = styled.div`
  width: clamp(280px, 30vw, 369px); /* 최소 300px, 최대 369px */
  height: clamp(300px, 28vw, 342.4px); /* 최소 300px, 최대 342.4px */
  max-width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.2rem;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
    transition: transform 0.2s;
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: clamp(150px, 16vw, 200px); /* 최소 150px, 최대 200px */
  object-fit: cover;
`;

const PostTitle = styled.h3`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  margin: 1rem 0 1.5rem;
  font-size: clamp(1.5rem, 1.8vw, 2rem); /* 최소 1.5rem, 최대 2rem */
`;

const PostContent = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  font-size: clamp(1rem, 1.5vw, 1.2rem); /* 최소 1rem, 최대 1.2rem */
`;

// NoPostsMessage 스타일 추가
const NoPostsMessage = styled.div`
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  padding: 2rem;
`;

const Divider = styled.hr`
  margin: 5rem 0;
  border: 1px solid;
  width: 100%;
`;

export default LatestPosts;
