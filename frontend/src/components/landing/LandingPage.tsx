import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Apple1 from "../../assets/images/apple.png";
import Apple3 from "../../assets/images/apple3.jpg";
import Apple4 from "../../assets/images/apple4.jpg";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Noto+Sans+JP:wght@100..900&family=Noto+Sans+KR:wght@900&display=swap');

  body {
    margin: 0;
    font-family: 'Libre Baskerville';
    background-color: #fff;
    color: #333;
  }
`;

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isMoved, setIsMoved] = useState(false);

  const handleLogin = () => navigate("/login");
  const handleSignup = () => navigate("/signup");

  // 이미지 이동 상태를 토글하는 함수
  const toggleImagePosition = () => {
    setIsMoved(!isMoved);
  };

  return (
    <Container>
      <GlobalStyle />
      <LeftSection>
        <VerticalLine />
        <Title>APPLE</Title>
        <Title>NOTE</Title>
        <AppleImageContainer onClick={toggleImagePosition}>
          <AppleImage src={Apple1} alt="Apple1" isMoved={isMoved} />
        </AppleImageContainer>
        <ButtonGroup>
          <Button onClick={handleLogin}>Login</Button>
          <Button onClick={handleSignup}>Sign up</Button>
        </ButtonGroup>
      </LeftSection>
      <RightSection>
        <Image src={Apple3} alt="Apple3" />
        <Image src={Apple4} alt="Apple4" />
      </RightSection>
    </Container>
  );
};

export default LandingPage;

// Styled Components

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #fff;
`;

const LeftSection = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  align-items: flex-end;
  padding-right: 20px;
`;

const VerticalLine = styled.div`
  position: absolute;
  right: 0;
  width: 2px;
  height: 97%;
  background-color: #333;
`;

const Title = styled.h1`
  position: relative;
  font-size: 7.8rem;
  font-weight: 700;
  color: #333;
  font-family: "Merriweather", serif;
`;

const AppleImageContainer = styled.div`
  position: relative;
  overflow: visible;
  width: 550px;
  margin-bottom: 20px;
`;

const AppleImage = styled.img<{ isMoved: boolean }>`
  width: 100%;
  object-fit: cover;
  transition:
    transform 0.3s ease-in-out,
    z-index 0.3s ease-in-out;
  position: relative;
  transform: ${({ isMoved }) =>
    isMoved ? "translateX(-200px) translateZ(-2px)" : "translateX(0) translateZ(0)"};
  z-index: ${({ isMoved }) => (isMoved ? 0 : 2)};
`;

const ButtonGroup = styled.div`
  position: absolute;
  top: 70%;
  right: 30%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #555;
  }
`;

const RightSection = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 200px;
  height: auto;
  object-fit: cover;
  margin: 10px;
`;
