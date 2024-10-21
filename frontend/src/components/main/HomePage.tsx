import styled from "styled-components";

import useCustomTheme from "@common/styles/useCustomTheme";

interface HomePageProps {
  data?: null;
}

const HomePage: React.FC<HomePageProps> = () => {
  const { toggleTheme, themeType } = useCustomTheme();

  const icon = themeType === "light" ? "🍎" : "🍏";

  const onClickHandler = () => {
    toggleTheme();
  };

  return (
    <div>
      <h1>
        {icon} Hello World {icon}
      </h1>
      <StyledButton onClick={onClickHandler}>Click Me!</StyledButton>
    </div>
  );
};

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  background-color: ${({ theme }) => theme.buttonBgColor};
  color: ${({ theme }) => theme.buttonTextColor};
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

export default HomePage;
