import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useCustomTheme from "@common/hooks/useCustomTheme";

const LogoSection: React.FC = () => {
  const { themeType } = useCustomTheme(); // 테마 정보 가져오기
  const navigate = useNavigate();

  const icon = themeType === "light" ? "/logo.png" : "/logo(darkmode).png"; // 테마에 따른 로고 선택

  const handleLogoClick = () => {
    navigate("/home"); // 로고 클릭 시 홈으로 이동
  };

  return (
    <StyledLogoSection onClick={handleLogoClick}>
      <Logo src={icon} alt="AppleNote Logo" />
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
`;

/* 로고 크기 고정 및 비율 유지 */
const Logo = styled.img`
  width: 100%;
  height: auto;
  max-width: 198px; /* 최대 너비 198px */
  min-width: 130px; /* 최소 너비 130px */
  max-height: 70px; /* 최대 높이 70px */
  object-fit: contain; /* 비율 유지하며 이미지 조정 */
`;

export default LogoSection;
