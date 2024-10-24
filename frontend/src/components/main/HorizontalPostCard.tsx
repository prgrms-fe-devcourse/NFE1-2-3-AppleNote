import React from "react";
import styled from "styled-components";
import { Post } from "./postApi";

interface HorizontalPostCardProps {
  post: Post;
}

// 날짜 형식 변환 함수 (영문 전체 월명 표기)
const formatDate = (dateString: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long", // 'January', 'February', 등 전체 월명 표시
    day: "numeric",
  };

  return new Date(dateString).toLocaleDateString("en-US", options);
};

const HorizontalPostCard: React.FC<HorizontalPostCardProps> = ({ post }) => {
  return (
    <Card>
      <Thumbnail src={post.images[0]} alt={post.title} />
      <Content>
        <Title>{post.title}</Title>
        {post.category.length > 0 && <Category>{post.category[0].name}</Category>}
        <CreateDate>{formatDate(post.createAt)}</CreateDate>
        <Description>{post.content}</Description>
      </Content>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  gap: 1rem;
`;

const Thumbnail = styled.img`
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default HorizontalPostCard;
