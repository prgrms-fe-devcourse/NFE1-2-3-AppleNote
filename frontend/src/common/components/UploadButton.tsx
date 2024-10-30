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
      <StyledFaPen />
      <UploadText className="upload-text">Upload</UploadText>
    </StyledUploadButton>
  );
};

const StyledUploadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: ${({ theme }) => theme.button.background};
  color: ${({ theme }) => theme.button.text};
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  height: 40px; /* 고정된 높이 */
  min-width: 120px; /* 텍스트 유무에 관계없이 최소 너비 유지 */
  transition:
    background-color 0.3s,
    color 0.3s,
    min-width 0.3s;

  &:hover {
    opacity: 0.9;
  }

  /* 화면 너비가 950px 이하일 때 텍스트 숨기기 */
  @media (max-width: 950px) {
    .upload-text {
      display: none;
    }

    /* 텍스트가 숨겨질 때 아이콘이 중앙에 오도록 조정 */
    justify-content: center;
    min-width: 50px; /* 아이콘만 있을 때 최소 너비 유지 */
    padding: 0.5rem; /* 아이콘만 있을 때 여백 조정 */
  }
`;

/* FaPen 아이콘 크기 고정 */
const StyledFaPen = styled(FaPen)`
  font-size: 1rem; /* 아이콘 크기 고정 */
`;

const UploadText = styled.span`
  font-size: 1rem;
`;

export default UploadButton;
