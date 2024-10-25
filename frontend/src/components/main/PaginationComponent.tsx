import React from "react";
import styled from "styled-components";

interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  totalPosts,
  postsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage); // 총 페이지 수 계산

  const handleClick = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <PaginationWrapper>
      {Array.from({ length: totalPages }, (_, index) => (
        <PageNumber
          key={index}
          isActive={index + 1 === currentPage}
          onClick={() => handleClick(index + 1)}>
          {index + 1}
        </PageNumber>
      ))}
    </PaginationWrapper>
  );
};

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 0.2rem;
`;

const PageNumber = styled.span<{ isActive: boolean }>`
  margin: 0 0.1rem;
  padding: 0.3rem 0.3rem;
  cursor: pointer;
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};
  pointer-events: ${({ isActive }) => (isActive ? "none" : "auto")};
  transition: text-decoration 0.3s;

  &:hover {
    text-decoration: underline;
  }
`;

export default PaginationComponent;
