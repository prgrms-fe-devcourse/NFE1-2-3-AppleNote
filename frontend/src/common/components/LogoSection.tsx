import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LogoImage from "@assets/icons/Logo.png";

const LogoSection: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/home"); // 로고 클릭 시 홈으로 이동
  };

  return (
    <StyledLogoSection onClick={handleLogoClick}>
      <LogoContainer>
        <Logo src={LogoImage} alt="Apple Note Logo" />
        <Text>
          <AppleText>AppleNote</AppleText>
          <NoteText>EST.2024</NoteText>
        </Text>
      </LogoContainer>
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

/* 로고 이미지 스타일 */
const Logo = styled.img`
  width: 70px; /* 로고 이미지 너비 설정 */
  height: 70px; /* 로고 이미지 높이 설정 */
  margin-right: 8px; /* 텍스트와 간격 설정 */
  margin-top: -15px;
`;

/* 텍스트 기반 로고 */
const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: bold;
  margin-left: -25px;

  @media (max-width: 520px) {
    font-size: clamp(1.2rem, 2vw, 1.5rem);
  }
`;
/* 텍스트 기반 로고 */
const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  margin-left: -10px;
`;

const AppleText = styled.span`
  font-size: clamp(1.5rem, 1.7rem, 2rem);
  color: ${({ theme }) => theme.logo.primary.text};
  transition:
    background-color 0.3s,
    color 0.3s;
`;

const NoteText = styled.span`
  font-size: clamp(7px, 10px, 1.2rem);
  color: ${({ theme }) => theme.logo.secondary.text};
  transition:
    background-color 0.3s,
    color 0.3s;
`;

export default LogoSection;
