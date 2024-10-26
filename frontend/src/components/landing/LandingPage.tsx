import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <Container>
      <Title>Welcome to Our Service</Title>
      <Subtitle>Join us to experience the best service!</Subtitle>
      <ButtonGroup>
        <Button onClick={handleLogin} color="#007bff">
          Login
        </Button>
        <Button onClick={handleSignup} color="#28a745">
          Sign Up
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default LandingPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button<{ color: string }>`
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  color: #fff;
  background-color: ${(props) => props.color};

  &:hover {
    opacity: 0.9;
  }
`;
