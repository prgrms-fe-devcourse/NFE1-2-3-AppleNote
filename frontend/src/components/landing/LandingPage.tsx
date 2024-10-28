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
      </LeftSection>
      <RightSection>
        <Image1 src={Apple4} alt="Apple3" />
        <Image2 src={Apple3} alt="Apple4" />
        <ButtonGroup>
          <Button onClick={handleLogin}>Login</Button>
          <Button onClick={handleSignup}>Sign up</Button>
        </ButtonGroup>
        <Subtitle1>Place For</Subtitle1>
        <Subtitle2>BETTER RECORDS.</Subtitle2>
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
  width: 37%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  align-items: center;
  padding-right: 10px;
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
  width: 600px;
  margin-bottom: 420px;
`;

const AppleImage = styled.img<{ isMoved: boolean }>`
  width: 100%;
  object-fit: cover;
  position: absolute;
`;

const ButtonGroup = styled.div`
  position: absolute;
  top: 70%;
  right: 30%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  opacity: 1;
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
  position: relative;
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left; /* 부모 요소에서 왼쪽 정렬 */
  justify-content: flex-start;
`;

const Image1 = styled.img`
  position: relative;
  width: 550px;
  height: auto;
  object-fit: cover;
  margin-left: -250px;
  margin-top: 20px;
  z-index: 1;
`;

const Image2 = styled.img`
  width: 420px;
  height: auto;
  object-fit: cover;
  margin-right: -450px;
  margin-top: -170px;
`;

const Subtitle1 = styled.h2`
  position: relative;
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  font-family: "Merriweather", serif;
  align-items: flex-start;
  margin-left: -700px;
  margin-top: -50px;
`;

const Subtitle2 = styled.h2`
  position: relative;
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  font-family: "Merriweather", serif;
  align-items: flex-start;
  margin-left: -540px;
  border-bottom: 1.5px solid;
`;
