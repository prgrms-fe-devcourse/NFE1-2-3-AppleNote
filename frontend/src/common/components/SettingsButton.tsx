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
  border-radius: 50%; /* 버튼을 원형으로 만듦 */
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;

  /* 화면이 좁아져도 크기 유지 */
  min-width: 50px;
  min-height: 50px;

  &:hover {
    opacity: 0.8;
  }

  /* 강제 고정 크기 유지 - 부모 요소 크기 제한 무시 */
  flex-shrink: 0;
`;

export default SettingsButton;
