import React from "react";
import styled from "styled-components";
import { Post } from "@components/main/postApi";
import { useNavigate } from "react-router-dom";
import { getThumbnailSrc } from "@common/utils/getThumbnailSrc";

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
  const thumbnailSrc = getThumbnailSrc(post.images); // 유효성 검사
  const categoryName = post.categories?.[0]?.name || ""; // 유효성 검사
  const formattedDate = formatDate(post.createdAt);
  const handleCardClick = () => {
    navigate(`/posts/${post.postId}`); // 포스트 상세 페이지로 이동
  };

  return (
    <Card onClick={handleCardClick}>
      <Thumbnail src={thumbnailSrc} alt={post.title} />
      <Content>
        {categoryName && <Category>{categoryName}</Category>}
        <Title>{post.title || "Untitled Post"}</Title> {/* 유효성 검사 */}
        <CreateDate>{formattedDate}</CreateDate>
        <Description>{post.content || "No content available"}</Description> {/* 유효성 검사 */}
      </Content>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  width: clamp(330px, 30vw, 906px); /* 최소 330px, 최대 906px */
  gap: 1rem;
  align-items: flex-start;
  width: 100%;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
    transition: transform 0.2s;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Thumbnail = styled.img`
  width: 260px;
  height: 200px;
  object-fit: cover;
  flex-shrink: 0;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: calc(100% - 260px); /* Thumbnail의 크기를 제외한 나머지 공간 */
  overflow: hidden;
  min-width: 0;

  @media (max-width: 768px) {
    max-width: 260px;
    align-items: center;
  }
`;

const Category = styled.span`
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: #888;
  margin-top: 0.2rem;

  @media (max-width: 768px) {
    margin-top: 0.1rem;
  }
`;

const Title = styled.h2`
  margin: 0.2rem 0 0.5rem;
  font-size: clamp(1.4rem, 2vw, 1.7rem);

  @media (max-width: 768px) {
    margin: 0.1rem 0 0.25rem;
  }
`;

const CreateDate = styled.div`
  font-size: clamp(0.8rem, 2vw, 1rem);
  color: #aaa;
`;

const Description = styled.p`
  margin-top: 1.5rem;
  font-size: clamp(0.8rem, 2vw, 1rem);
  display: -webkit-box; /* Flexbox 기반의 줄바꿈 */
  -webkit-line-clamp: 3; /* 최대 3줄까지 표시 */
  -webkit-box-orient: vertical; /* 세로 방향으로 정렬 */
  overflow: hidden; /* 넘치는 내용 숨김 */
  text-overflow: ellipsis; /* 넘치는 내용에 '...' 표시 */
  line-height: 1.5; /* 줄 간격 조절 */

  @media (max-width: 768px) {
    margin: 0.75rem 0 1rem;
  }
`;

export default HorizontalPostCard;
