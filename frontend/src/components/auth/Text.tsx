import styled from "styled-components";

export const AuthOptionSubText = styled.h4`
  cursor: pointer;
  color: ${({ theme }) => `${theme.text.secondary}80`};
  font-weight: 400;
  font-size: 12px;
  text-align: center;

  &:hover {
    color: ${({ theme }) => theme.text.secondary};
  }
`;
