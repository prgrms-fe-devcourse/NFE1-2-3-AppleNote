import useCustomTheme from "@common/hooks/useCustomTheme";
import styled from "styled-components";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggleButton = () => {
  const { toggleTheme, themeType } = useCustomTheme();

  return (
    <StyledButton onClick={toggleTheme}>
      <IconWrapper>
        {themeType === "light" ? <FaSun size={20} /> : <FaMoon size={20} />}
      </IconWrapper>
      <ButtonText>{themeType === "light" ? "DAY" : "NIGHT"}</ButtonText>
    </StyledButton>
  );
};

/* 테마 토글 버튼 */
const StyledButton = styled.button`
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
  box-shadow: ${({ theme }) => theme.boxShadow.primary};
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

export default ThemeToggleButton;
