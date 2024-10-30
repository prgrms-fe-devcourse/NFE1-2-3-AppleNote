import React from "react";
import styled from "styled-components";
import { FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UploadButton: React.FC = () => {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate("/create-post");
  };

  return (
    <StyledUploadButton onClick={handleUploadClick} aria-label="Upload">
      <FaPen />
      <UploadText>Upload</UploadText>
    </StyledUploadButton>
  );
};

const StyledUploadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${({ theme }) => theme.button.background};
  color: ${({ theme }) => theme.button.text};
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

const UploadText = styled.span`
  font-size: 1rem;
`;

export default UploadButton;
