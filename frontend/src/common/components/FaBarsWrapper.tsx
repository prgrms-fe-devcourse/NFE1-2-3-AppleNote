import React, { useState } from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import Category from "@components/category/Category";

interface FaBarsWrapperProps {
  isSticky: boolean;
  rightOffset: number;
  setSelectedCategoryId: (id: string) => void;
  setSelectedCategoryName: (name: string) => void;
  onCategoryChange: () => void;
}

const FaBarsWrapper: React.FC<FaBarsWrapperProps> = ({
  isSticky,
  rightOffset,
  setSelectedCategoryId,
  setSelectedCategoryName,
  onCategoryChange,
}) => {
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);

  const toggleCategory = () => {
    setIsCategoryVisible((prev) => !prev);
  };

  // 드롭다운 항목 클릭 시 드롭다운을 닫지 않도록 설정
  const handleDropdownClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <Wrapper isSticky={isSticky} rightOffset={rightOffset} onClick={toggleCategory}>
      <FaBars size={24} />
      {isCategoryVisible && (
        <Dropdown onClick={handleDropdownClick}>
          <Category
            setSelectedCategoryId={setSelectedCategoryId}
            setSelectedCategoryName={setSelectedCategoryName}
            onCategoryChange={onCategoryChange}
          />
        </Dropdown>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ isSticky: boolean; rightOffset: number }>`
  position: ${({ isSticky }) => (isSticky ? "fixed" : "absolute")};
  top: ${({ isSticky }) => (isSticky ? "20px" : "auto")};
  right: ${({ rightOffset }) => `${rightOffset}px`};
  cursor: pointer;
  z-index: 20;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  background: ${({ theme }) => theme.background.secondary};
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: ${({ theme }) => theme.boxShadow.primary};
  border-radius: 8px;
  padding: 1rem;
  width: 220px;
  z-index: 10;
`;

export default FaBarsWrapper;
