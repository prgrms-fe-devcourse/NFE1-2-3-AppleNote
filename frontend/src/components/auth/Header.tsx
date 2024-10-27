import styled from "styled-components";

export const AuthTitle = styled.h1`
  color: ${({ theme }) => `${theme.text.primary}`};
  font-size: 33px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 14px;
`;

export const AuthSubTitle = styled.h3`
  color: ${({ theme }) => `${theme.text.primary}`};
  font-size: 16px;
  text-align: center;
`;
