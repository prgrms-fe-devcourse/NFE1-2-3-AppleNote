import React from "react";
import styled from "styled-components";
import { Post } from "./postApi";
import { useNavigate } from "react-router-dom";

interface HorizontalPostCardProps {
  post: Post;
}

// 날짜 형식 변환 함수 (영문 전체 월명 표기)
const formatDate = (dateString?: Date) => {
  if (!dateString) return "Invalid date"; // 유효성 검사
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long", // 'January', 'February', 등 전체 월명 표시
    day: "numeric",
  };

  return new Date(dateString).toLocaleDateString("en-US", options);
};

const HorizontalPostCard: React.FC<HorizontalPostCardProps> = ({ post }) => {
  const navigate = useNavigate();
  const thumbnailSrc = post.images?.[0] || "/default-thumbnail.png"; // 유효성 검사
  const categoryName = post.categories?.[0]?.name || ""; // 유효성 검사
  const formattedDate = formatDate(post.createdAt);
  const handleCardClick = () => {
    navigate(`/posts/${post.postId}`); // 포스트 상세 페이지로 이동
  };

  return (
    <Card onClick={handleCardClick}>
      <Thumbnail src={thumbnailSrc} alt={post.title} />
      <Content>
        <Title>{post.title || "Untitled Post"}</Title> {/* 유효성 검사 */}
        {categoryName && <Category>{categoryName}</Category>}
        <CreateDate>{formattedDate}</CreateDate>
        <Description>{post.content || "No content available"}</Description> {/* 유효성 검사 */}
      </Content>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  gap: 1rem;

  &:hover {
    transform: scale(1.02);
    transition: transform 0.2s;
  }
`;

const Thumbnail = styled.img`
  width: 200px;
  height: 150px;
  object-fit: cover;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.5rem;
`;

const Category = styled.span`
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 0.5rem;
`;

const CreateDate = styled.div`
  font-size: 0.8rem;
  color: #aaa;
`;

const Description = styled.p`
  display: -webkit-box; /* Flexbox 기반의 줄바꿈 */
  -webkit-line-clamp: 3; /* 최대 4줄까지 표시 */
  -webkit-box-orient: vertical; /* 세로 방향으로 정렬 */
  overflow: hidden; /* 넘치는 내용 숨김 */
  text-overflow: ellipsis; /* 넘치는 내용에 '...' 표시 */
  max-width: 100%; /* 부모의 최대 너비 사용 */
  line-height: 1.5; /* 줄 간격 조절 */
`;

export default HorizontalPostCard;
