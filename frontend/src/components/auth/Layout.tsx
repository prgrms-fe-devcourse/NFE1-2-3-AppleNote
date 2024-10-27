import styled from "styled-components";

export const AuthPageLayout = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;

export const AuthHeaderContainer = styled.div`
  margin-bottom: 20px;
`;

export const AuthFormContainer = styled.div`
  width: 100%;
  max-width: 324px;
`;

export const AuthOptionsContainer = styled.div`
  align-items: center;
  display: flex;
`;

export const AuthInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
