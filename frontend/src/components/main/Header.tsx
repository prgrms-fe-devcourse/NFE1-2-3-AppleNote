import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchUserData } from "./headerApi";
import SearchBar from "@common/components/SearchBar";
import ThemeToggleButton from "@common/components/ThemeToggleButton";
import LogoSection from "@common/components/LogoSection";
import UploadButton from "@common/components/UploadButton";
import SettingsButton from "@common/components/SettingsButton";

// 기본 프로필 이미지 경로
const DEFAULT_PROFILE_IMAGE = "/default-profile-image.png";

const Header: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // 사용자 정보 API 호출 및 프로필 이미지 설정
  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData();

        setProfileImage(data.profileImage);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    getUserData();
  }, []);

  return (
    <StyledHeader>
      <LogoSection />
      <ThemeToggleButton />
      <SearchAndIconsSection>
        <SearchBar placeholder="검색어를 입력하세요" />
        <UploadButton />
        <ProfileIcon src={profileImage || DEFAULT_PROFILE_IMAGE} alt="Profile Icon" />
        <SettingsButton />
      </SearchAndIconsSection>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    gap: 0.5rem;
  }
`;

/* 검색창 및 아이콘 섹션 */
const SearchAndIconsSection = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 1rem;
`;

/* 프로필 아이콘 및 설정 버튼 */
const ProfileIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ccc;

  /* 화면 너비가 520px 이하일 때 숨기기 */
  @media (max-width: 520px) {
    display: none;
  }
`;

export default Header;
