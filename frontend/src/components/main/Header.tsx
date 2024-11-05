import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchUserData } from "@components/main/headerApi";
import SearchBar from "@common/components/SearchBar";
import ThemeToggleButton from "@common/components/ThemeToggleButton";
import LogoSection from "@common/components/LogoSection";
import UploadButton from "@common/components/UploadButton";
import SettingsButton from "@common/components/SettingsButton";
import { useModal } from "@components/myPage/Context/ModalContext";

// 기본 프로필 이미지 경로
const DEFAULT_PROFILE_IMAGE = "/default-profile-image.png";

const Header: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const { isOpen } = useModal();

  // 사용자 정보 API 호출 및 프로필 이미지 설정
  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData();

        setProfileImage(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    getUserData();
  }, [isOpen]);

  return (
    <StyledHeader>
      <LogoSection />
      <ThemeToggleButton />
      <SearchAndIconsSection>
        <SearchBar placeholder="Enter a search term" />
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
  padding: 1rem;
  gap: 0.5rem;
`;

/* 검색창 및 아이콘 섹션 */
const SearchAndIconsSection = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 1rem;

  /* 화면이 좁아질 때 로고와 다른 요소 간의 간격 조정 */
  @media (max-width: 520px) {
    gap: 0.5rem;
  }
`;

/* 프로필 아이콘 및 설정 버튼 */
const ProfileIcon = styled.img`
  width: 40px;
  height: 40px;
  min-width: 40px;
  min-height: 40px;
  max-width: 40px;
  max-height: 40px;
  border-radius: 50%;
  background-color: #ccc;

  /* 화면 너비가 520px 이하일 때 숨기기 */
  @media (max-width: 520px) {
    display: none;
  }
`;

export default Header;
