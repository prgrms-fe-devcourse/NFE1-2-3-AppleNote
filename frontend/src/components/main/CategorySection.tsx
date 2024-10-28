import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

interface CategorySectionProps {
  title: string;
  small?: boolean; // 작은 크기 여부를 결정하는 prop 추가
}

const CategorySection: React.FC<CategorySectionProps> = ({ title, small }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [dividerWidth, setDividerWidth] = useState(300); // 기본 너비

  // Title의 길이에 따라 Divider의 너비 조정
  useEffect(() => {
    if (titleRef.current) {
      const titleWidth = titleRef.current.getBoundingClientRect().width;
      const adjustedWidth = small ? titleWidth + 60 : titleWidth + 100;

      setDividerWidth(adjustedWidth); // // small 여부에 따라 Divider 너비 설정
    }
  }, [title, small]);

  return (
    <Container>
      <Title ref={titleRef} small={small}>
        {title}
      </Title>
      <DividerWrapper>
        <Divider small={small} style={{ width: `${dividerWidth}px` }} />
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

const Title = styled.h2<{ small?: boolean }>`
  font-size: 3rem;
  font-weight: bold;
  margin: 0 0 0 50px;

  /* 작은 크기일 때 스타일 조정 */
  ${({ small }) =>
    small &&
    css`
      font-size: 2rem; /* 작은 크기 */
      margin: 0 0 0 30px; /* 여백 조정 */
    `}
`;

const DividerWrapper = styled.div`
  display: flex;
  justify-content: flex-start; /* 왼쪽 정렬 */
  width: 100%; /* 부모 너비에 맞춤 */
`;

const Divider = styled.div<{ small?: boolean }>`
  height: 3px;
  border-top: 7px solid;
  ${({ small }) =>
    small &&
    css`
      height: 2px;
      border-top: 4px solid;
    `}
`;

export default CategorySection;
