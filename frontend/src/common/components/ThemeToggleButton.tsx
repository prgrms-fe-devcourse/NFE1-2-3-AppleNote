import useCustomTheme from "@common/hooks/useCustomTheme";
import styled from "styled-components";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggleButton = () => {
  const { toggleTheme, themeType } = useCustomTheme();

  return (
    <StyledButton onClick={toggleTheme} aria-label="Theme Toggle">
      <IconWrapper>
        {themeType === "light" ? <FaSun size={20} /> : <FaMoon size={20} />}
      </IconWrapper>
      <ButtonText className="theme-text">{themeType === "light" ? "DAY" : "NIGHT"}</ButtonText>
    </StyledButton>
  );
};

/* 테마 토글 버튼 */
const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between; /* 텍스트가 사라질 때 아이콘 중앙 정렬 */
  width: 110px; /* 기본 너비 */
  height: 40px; /* 버튼 높이 고정 */
  margin-left: 2rem;
  padding: 10px;
  border: solid;
  border-radius: 30px; /* 기본 모양 */
  background-color: ${({ theme }) => theme.background.primary};
  box-shadow: ${({ theme }) => theme.boxShadow.primary};
  color: ${({ theme }) => theme.text.primary};
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s,
    box-shadow 0.3s,
    width 0.3s,
    margin-left 0.3s,
    border-radius 0.3s;

  &:hover {
    opacity: 0.9;
  }

  /* 화면 너비가 870px 이하일 때 텍스트 숨기고 버튼을 원형으로 변경 */
  @media (max-width: 870px) {
    .theme-text {
      display: none;
    }

    /* 텍스트가 숨겨질 때 아이콘이 중앙에 오도록 조정 */
    justify-content: center;
    width: 40px; /* 아이콘만 있을 때 최소 너비 유지 */
    margin-left: 0;
    padding: 0.5rem; /* 아이콘만 있을 때 여백 조정 */
    border-radius: 50%; /* 원형 모양 유지 */
  }
`;

/* 아이콘 래퍼 */
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;

/* 버튼 텍스트 */
const ButtonText = styled.span`
  font-size: 0.8rem;
  font-weight: bold;
  margin-left: 0.5rem;
  margin-right: 0.3rem;
`;

export default ThemeToggleButton;
