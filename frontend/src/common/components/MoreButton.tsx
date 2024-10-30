import React from "react";
import styled from "styled-components";

interface MoreButtonProps {
  onClick: () => void;
  className?: string; // 추가 스타일링을 위해 className 지원
  label?: string;
}

const MoreButton: React.FC<MoreButtonProps> = ({ onClick, className, label = ">>" }) => (
  <Button className={className} onClick={onClick}>
    {label}
  </Button>
);

const Button = styled.button`
  background-color: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.text.primary};
  border: none;
  font-size: 1.8rem;
  margin-right: 25px;
  cursor: pointer;
  letter-spacing: -0.5rem;
  transition:
    background-color 0.3s,
    color 0.3s;

  &:hover {
    opacity: 0.6;
  }
`;

export default MoreButton;
