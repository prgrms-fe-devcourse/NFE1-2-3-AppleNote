import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

interface SearchBarProps {
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder }) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  // 검색 페이지를 벗어나면 입력 초기화
  useEffect(() => {
    if (!location.pathname.startsWith("/search")) {
      setSearchInput("");
    }

    return () => {
      setSearchInput("");
    };
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?query=${searchInput}`);
    }
  };

  return (
    <SearchForm onSubmit={handleSearch}>
      <SearchBarWrapper>
        <SearchInput
          placeholder={placeholder}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <SearchButton type="submit">
          <FaSearch />
        </SearchButton>
      </SearchBarWrapper>
    </SearchForm>
  );
};

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

/* 검색창 래퍼 */
const SearchBarWrapper = styled.div`
  position: relative;
  width: 300px;
`;

/* 검색 인풋 필드 */
const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 2.5rem 0.5rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.text.primary};
  transition:
    background-color 0.3s,
    color 0.3s;
`;

/* 검색 버튼 */
const SearchButton = styled.button`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.text.primary};
  border: none;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;
`;

export default SearchBar;
