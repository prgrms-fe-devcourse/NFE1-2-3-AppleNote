import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

interface SearchResultHeaderProps {
  searchQuery: string;
}

const SearchResultHeader: React.FC<SearchResultHeaderProps> = ({ searchQuery }) => (
  <HeaderContainer>
    <FaSearch size={30} />
    <SearchResultText>Search results for"{searchQuery}"</SearchResultText>
  </HeaderContainer>
);

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
`;

const SearchResultText = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  white-space: nowrap;
`;

export default SearchResultHeader;
