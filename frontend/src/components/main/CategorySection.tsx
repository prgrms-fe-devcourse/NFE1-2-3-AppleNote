import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface CategorySectionProps {
  title: string;
}

const CategorySection: React.FC<CategorySectionProps> = ({ title }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [dividerWidth, setDividerWidth] = useState(300); // 기본 너비

  // Title의 길이에 따라 Divider의 너비 조정
  useEffect(() => {
    if (titleRef.current) {
      const titleWidth = titleRef.current.getBoundingClientRect().width;

      setDividerWidth(titleWidth + 100); // Title의 길이 + 양쪽 50px씩
    }
  }, [title]);

  return (
    <Container>
      <Title ref={titleRef}>{title}</Title>
      <DividerWrapper>
        <Divider style={{ width: `${dividerWidth}px` }} />
      </DividerWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-bottom: 2rem; /* 아래 콘텐츠와의 간격 */
  display: flex;
  flex-direction: column; /* 수직 정렬 */
  align-items: flex-start; /* 왼쪽 정렬 */
  gap: 0.5rem; /* Title과 Divider 사이의 간격 */
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  margin: 0 0 0 50px; /* 여백 제거 */
`;

const DividerWrapper = styled.div`
  display: flex;
  justify-content: flex-start; /* 왼쪽 정렬 */
  width: 100%; /* 부모 너비에 맞춤 */
`;

const Divider = styled.div`
  height: 3px;
  border-top: 7px solid;
`;

export default CategorySection;
