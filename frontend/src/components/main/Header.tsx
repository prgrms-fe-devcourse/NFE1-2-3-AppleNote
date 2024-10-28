import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaSearch, FaCog, FaPen } from "react-icons/fa";
import { fetchUserData } from "./headerApi";
import { useNavigate } from "react-router-dom";

// 기본 프로필 이미지 경로
const DEFAULT_PROFILE_IMAGE = "/default-profile-image.png";

const Header: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const navigate = useNavigate();

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

  // 로고 클릭 시 홈으로 이동하는 함수
  const handleLogoClick = () => {
    navigate("/");
  };

  const handleUploadClick = () => {
    navigate("/create-post");
  };
  const handleSettingsClick = () => {
    navigate("/setting");
  };

  return (
    <StyledHeader>
      <LogoSection onClick={handleLogoClick}>
        <Logo src="/logo.png" alt="AppleNote Logo" />
      </LogoSection>

      <SearchAndIconsSection>
        <SearchBarWrapper>
          <SearchInput placeholder="검색어를 입력하세요" />
          <SearchButton aria-label="Search">
            <FaSearch />
          </SearchButton>
        </SearchBarWrapper>

        <UploadButton onClick={handleUploadClick} aria-label="Upload">
          <FaPen />
          <UploadText>Upload</UploadText>
        </UploadButton>

        <ProfileIcon src={profileImage || DEFAULT_PROFILE_IMAGE} alt="Profile Icon" />

        <SettingsButton onClick={handleSettingsClick} aria-label="Settings">
          <FaCog />
        </SettingsButton>
      </SearchAndIconsSection>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  gap: 1rem;
`;

/* 로고 섹션 */
const LogoSection = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer; /* 클릭 가능하도록 설정 */
`;

/* 로고 크기 유지 */
const Logo = styled.img`
  width: 198px;
  height: 70px;
  max-width: 100%; /* 화면 너비에 맞게 조정 */
  object-fit: contain; /* 비율 유지하며 이미지 조정 */
`;

/* 검색창 및 아이콘 섹션 */
const SearchAndIconsSection = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 1rem;
`;

/* 검색창 래퍼 */
const SearchBarWrapper = styled.div`
  position: relative;
  width: 300px;
`;

/* 검색 인풋 필드 */
const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 2.5rem 0.5rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

/* 검색 버튼 */
const SearchButton = styled.button`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;

/* Upload 버튼 */
const UploadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

/* Upload 텍스트 */
const UploadText = styled.span`
  font-size: 1rem;
`;

/* 프로필 아이콘 및 설정 버튼 */
const ProfileIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ccc;
`;

const SettingsButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export default Header;
