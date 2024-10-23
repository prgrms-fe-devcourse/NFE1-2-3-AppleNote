import React from "react";
import styled from "styled-components";

import searchIcon from "@assets/icons/search-icon.svg";
import settingsIcon from "@assets/icons/settings.svg";

const Header: React.FC = () => (
  <StyledHeader>
    <LogoSection>
      <Logo src="/logo.png" alt="AppleNote Logo" />
    </LogoSection>

    <MenuSection>
      <HomeLink href="/">Home</HomeLink> {/* 추후 더 많은 링크 추가 가능 */}
    </MenuSection>

    <SearchAndIconsSection>
      <SearchBarWrapper>
        <SearchInput placeholder="검색어를 입력하세요" />
        <SearchButton aria-label="Search">
          <IconImage src={searchIcon} alt="Search Icon" />
        </SearchButton>
      </SearchBarWrapper>

      <ProfileIcon src="/profile-placeholder.png" alt="Profile Icon" />
      <SettingsButton aria-label="Settings">
        <IconImage src={settingsIcon} alt="Settings Icon" />
      </SettingsButton>
    </SearchAndIconsSection>
  </StyledHeader>
);

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f5f5f5;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  gap: 1rem;
`;

/* 로고 섹션 */
const LogoSection = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 198px;
  height: 70px;
`;

/* 메뉴 링크 섹션 */
const MenuSection = styled.nav`
  margin-left: 1rem;
  display: flex;
  align-items: center;
`;

const HomeLink = styled.a`
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: none;
  color: black;

  &:hover {
    text-decoration: underline;
  }
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

const IconImage = styled.img`
  width: 24px;
  height: 24px;
`;

export default Header;
