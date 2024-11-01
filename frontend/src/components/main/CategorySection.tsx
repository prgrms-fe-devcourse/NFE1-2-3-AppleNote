import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

interface CategorySectionProps {
  title: string;
  small?: boolean; // 작은 크기 여부를 결정하는 prop 추가
}

const CategorySection: React.FC<CategorySectionProps> = ({ title, small }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [dividerWidth, setDividerWidth] = useState(0);
  const [additionalWidth, setAdditionalWidth] = useState(0);

  // Title의 길이에 따라 Divider의 너비 조정
  const updateDividerWidth = () => {
    if (titleRef.current) {
      const titleWidth = titleRef.current.getBoundingClientRect().width;
      const computedAdditionalWidth = small
        ? Math.max(60, Math.min(100, window.innerWidth * 0.1)) // small일 때 비율 계산
        : Math.max(100, Math.min(140, window.innerWidth * 0.15)); // 기본일 때 비율 계산

      setAdditionalWidth(computedAdditionalWidth);

      setDividerWidth(titleWidth + computedAdditionalWidth);
    }
  };

  useEffect(() => {
    // 초기 설정
    updateDividerWidth();

    // ResizeObserver를 사용하여 title의 크기 변화를 감지하고 너비를 업데이트
    const observer = new ResizeObserver(updateDividerWidth);

    if (titleRef.current) observer.observe(titleRef.current);

    // 윈도우 리사이즈 이벤트 핸들러 등록
    window.addEventListener("resize", updateDividerWidth);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateDividerWidth);
    };
  }, [title, small]);

  return (
    <Container>
      <Title ref={titleRef} small={small} margin={additionalWidth / 2}>
        {title}
      </Title>
      <DividerWrapper>
        <Divider small={small} width={dividerWidth} />
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

const Title = styled.h2<{ small?: boolean; margin: number }>`
  font-size: clamp(2rem, 3vw, 3rem);
  font-weight: bold;
  margin-left: ${({ margin }) => `${margin}px`};
  margin-right: ${({ margin }) => `${margin}px`};

  ${({ small }) =>
    small &&
    css`
      font-size: clamp(1.5rem, 2.5vw, 2rem);
    `}
`;

const DividerWrapper = styled.div`
  display: flex;
  justify-content: flex-start; /* 왼쪽 정렬 */
  width: 100%; /* 부모 너비에 맞춤 */
`;

const Divider = styled.div<{ small?: boolean; width: number }>`
  height: ${({ small }) => (small ? "clamp(4px, 1vw, 6px)" : "clamp(4px, 1.5vw, 7px)")};
  background-color: ${({ theme }) => theme.text.primary};
  width: ${({ width }) => `${width}px`};
`;

export default CategorySection;
