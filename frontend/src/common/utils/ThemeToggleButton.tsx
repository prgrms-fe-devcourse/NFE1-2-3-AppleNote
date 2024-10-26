import useCustomTheme from "@common/styles/useCustomTheme";

import styled from "styled-components";

/**
 * 테마 테스트용 컴포넌트
 */
const ThemeToggleButton = () => {
  const { toggleTheme, themeType } = useCustomTheme();

  const onClickHandler = () => {
    toggleTheme();
  };

  return <StyledButton onClick={onClickHandler}>{themeType}</StyledButton>;
};

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  background-color: ${({ theme }) => theme.text.secondary};
  color: ${({ theme }) => theme.background.primary};
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  &:hover {
    opacity: 0.9;
  }

  &:focus {
    outline: none;
  }
`;

export default ThemeToggleButton;
