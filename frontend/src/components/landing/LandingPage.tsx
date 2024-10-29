import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Apple1 from "../../assets/images/apple.png";
import Apple3 from "../../assets/images/apple3.jpg";
import Apple4 from "../../assets/images/apple4.jpg";
import Paper from "../../assets/images/papers.png";

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
        <Div1>
          <Image1 src={Apple4} alt="Apple3" />
          <ButtonGroup>
            <Button onClick={handleLogin}>Login</Button>
            <Button onClick={handleSignup}>Sign up</Button>
          </ButtonGroup>
        </Div1>
        <Image2 src={Apple3} alt="Apple4" />
        <Subtitle1>Place For</Subtitle1>
        <Subtitle2>BETTER RECORDS.</Subtitle2>
        <ImageContainer>
          <Image3 src={Paper} alt="Paper" />
        </ImageContainer>
      </RightSection>
    </Container>
  );
};

export default LandingPage;

// Styled Components

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0;
  display: flex;
  flex-direction: row;
  background-color: #fff;
`;

const LeftSection = styled.div`
  flex-basis: 35vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  align-items: center;
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
  bottom: 0px;
`;

const AppleImage = styled.img`
  width: 100%;
  object-fit: cover;
  position: relative;
`;

const VerticalLine = styled.div`
  position: absolute;
  right: 0;
  width: 2px;
  height: 98%;
  background-color: #333;
`;

const RightSection = styled.div`
  position: relative;
  flex-basis: 65vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const Div1 = styled.div`
  display: flex;
  flex-direction: row;
`;

const Image1 = styled.img`
  position: relative;
  width: 55%;
  height: auto;
  object-fit: cover;
  margin-top: 2vh;
  margin-left: 2vw;
  z-index: 1;
`;

const ButtonGroup = styled.div`
  position: relative;
  gap: 15px;
  opacity: 1;
  margin-top: 20px;
  margin-left: 15px;
`;

const Button = styled.button`
  position: relative;
  padding: 10px 10px;
  width: 100px;
  font-size: 1rem;
  color: #fff;
  background-color: #a9a9a9;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #555;
  }
`;

const Image2 = styled.img`
  position: relative;
  width: 50%;
  height: auto;
  object-fit: cover;
  margin-top: -30vh;
  margin-left: 30vw;
`;

const Subtitle1 = styled.h2`
  position: relative;
  margin-top: -7vh;
  margin-left: -51vw;
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  font-family: "Merriweather", serif;
`;

const Subtitle2 = styled.h2`
  position: relative;
  margin-top: -1vh;
  margin-left: -39.5vw;
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  font-family: "Merriweather", serif;
  border-bottom: 1.5px solid;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 80%;
  height: 70vh;
  overflow: hidden;
  margin-top: -5vh;
`;

const Image3 = styled.img`
  position: relative;
  object-fit: cover;
  margin-top: -25vh;
`;
