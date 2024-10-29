import React from "react";
import styled from "styled-components";
import { FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SettingsButton: React.FC = () => {
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    navigate("/setting");
  };

  return (
    <StyledSettingsButton onClick={handleSettingsClick} aria-label="Settings">
      <FaCog size={25} />
    </StyledSettingsButton>
  );
};

const StyledSettingsButton = styled.button`
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

export default SettingsButton;
