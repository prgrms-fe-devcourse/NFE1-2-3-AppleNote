import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaSearch, FaCog, FaPen, FaSun, FaMoon } from "react-icons/fa";
import { fetchUserData } from "./headerApi";
import { useNavigate, useLocation } from "react-router-dom";
import useCustomTheme from "@common/hooks/useCustomTheme";

// 기본 프로필 이미지 경로
const DEFAULT_PROFILE_IMAGE = "/default-profile-image.png";

const Header: React.FC = () => {
  const { toggleTheme, themeType } = useCustomTheme();
  const icon = themeType === "light" ? "/logo.png" : "/logo(darkmode).png";
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState<string>(""); // 검색 입력 상태
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로 감지

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

  // 검색어 초기화: 검색 페이지에서 벗어날 때 실행
  useEffect(() => {
    if (!location.pathname.startsWith("/search")) {
      setSearchInput(""); // 검색어 초기화
    }
  }, [location.pathname]); // 경로 변경 감지

  // 로고 클릭 시 홈으로 이동하는 함수
  const handleLogoClick = () => {
    navigate("/home");
  };

  // UploadButton 클릭 시 포스트 작성 페이지로 이동하는 함수
  const handleUploadClick = () => {
    navigate("/create-post");
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = searchInput.trim();

    if (query) {
      navigate(`/search?query=${query}`);
    }
  };

  const handleSettingsClick = () => {
    navigate("/setting");
  };

  return (
    <StyledHeader>
      <LogoSection onClick={handleLogoClick}>
        <Logo src={icon} alt="AppleNote Logo" />
      </LogoSection>

      <ThemeToggleButton onClick={toggleTheme} themeType={themeType}>
        <IconWrapper>
          {themeType === "light" ? <FaSun size={30} /> : <FaMoon size={30} />}
        </IconWrapper>
        <ButtonText>{themeType === "light" ? "DAY" : "NIGHT"}</ButtonText>
      </ThemeToggleButton>

      <SearchAndIconsSection>
        <SearchForm onSubmit={handleSearch}>
          <SearchBarWrapper>
            <SearchInput
              placeholder="검색어를 입력하세요"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <SearchButton aria-label="Search">
              <FaSearch />
            </SearchButton>
          </SearchBarWrapper>
        </SearchForm>

        <UploadButton onClick={handleUploadClick} aria-label="Upload">
          <FaPen />
          <UploadText>Upload</UploadText>
        </UploadButton>

        <ProfileIcon src={profileImage || DEFAULT_PROFILE_IMAGE} alt="Profile Icon" />

        <SettingsButton onClick={handleSettingsClick} aria-label="Settings">
          <FaCog size={25} />
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

/* 테마 토글 버튼 */
const ThemeToggleButton = styled.button<{ themeType: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 110px;
  height: 40px;
  margin-left: 2rem;
  padding: 10px;
  border: solid;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.background.primary};
  box-shadow: ${({ themeType }) =>
    themeType === "light" ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "0 4px 8px rgba(255, 255, 255, 0.2)"};
  color: ${({ theme }) => theme.text.primary};
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s,
    box-shadow 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;

const ButtonText = styled.span`
  font-size: 0.8rem;
  font-weight: bold;
  margin-right: 0.5rem;
`;

/* 검색창 및 아이콘 섹션 */
const SearchAndIconsSection = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 1rem;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  margin-left: auto;
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
  background-color: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.text.primary};
  transition:
    background-color 0.3s,
    color 0.3s;
`;

/* 검색 버튼 */
const SearchButton = styled.button`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.text.primary};
  border: none;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;
`;

/* Upload 버튼 */
const UploadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${({ theme }) => theme.button.background};
  color: ${({ theme }) => theme.button.text};
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;

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
  background-color: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.text.primary};
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

export default Header;
