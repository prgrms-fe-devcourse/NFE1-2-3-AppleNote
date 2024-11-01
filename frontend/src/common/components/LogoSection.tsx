import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LogoSection: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/home"); // 로고 클릭 시 홈으로 이동
  };

  return (
    <StyledLogoSection onClick={handleLogoClick}>
      <LogoText>
        <AppleText>Apple</AppleText>
        <NoteText>Note.</NoteText>
      </LogoText>
    </StyledLogoSection>
  );
};

/* 로고 섹션 */
const StyledLogoSection = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer; /* 클릭 가능하도록 설정 */
  justify-content: center; /* 로고를 가운데 정렬 */
  width: 198px; /* 고정된 너비 */
  height: 70px; /* 고정된 높이 */

  /* 헤더가 좁아진 이후 로고 크기를 줄이기 시작 */
  @media (max-width: 520px) {
    width: 150px;
    height: auto;
  }
`;

/* 텍스트 기반 로고 */
const LogoText = styled.div`
  display: flex;
  align-items: baseline;
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: bold;

  @media (max-width: 520px) {
    font-size: clamp(1.2rem, 2vw, 1.5rem);
  }
`;

const AppleText = styled.span`
  background-color: ${({ theme }) => theme.logo.primary.background};
  color: ${({ theme }) => theme.logo.primary.text};
  transition:
    background-color 0.3s,
    color 0.3s;
`;

const NoteText = styled.span`
  background-color: ${({ theme }) => theme.logo.secondary.background};
  color: ${({ theme }) => theme.logo.secondary.text};
  transition:
    background-color 0.3s,
    color 0.3s;
`;

export default LogoSection;
