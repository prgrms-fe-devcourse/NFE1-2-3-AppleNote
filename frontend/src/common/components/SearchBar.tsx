import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder }) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?query=${searchInput}`); // 검색 페이지로 이동
      setSearchInput(""); // 검색 후 입력 초기화
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
  width: 100%; /* 부모 요소에 맞게 가변 */
  max-width: 300px;
  min-width: 100px; /* 최소 너비 100px 유지 */
  display: flex;
  align-items: center;
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

  /* 텍스트가 좁아질 때 줄임표 표시 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

/* 검색 버튼 */
const SearchButton = styled.button`
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%; /* 원형 버튼 */
  background-color: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.text.primary};
  border: none;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;

  /* 크기 고정 */
  min-width: 38px;
  min-height: 38px;
  flex-shrink: 0;

  &:hover {
    opacity: 0.8;
  }
`;

export default SearchBar;
