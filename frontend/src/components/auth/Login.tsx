import styled from "styled-components";
import { FaRegUser } from "react-icons/fa6";
import { FaKey } from "react-icons/fa6";

import { AuthFormContainer, AuthPageLayout } from "./Layout";
import Checkbox from "@common/components/CheckBox";
import AuthButton from "./Button";
import { AuthTitle, AuthSubTitle } from "./Header";
import { AuthInput, AuthInputContainer } from "./Input";

const Login = () => {
  return (
    <AuthPageLayout>
      <AuthFormContainer>
        <Header />
        <Form />
        <Options />
        <Submit />
      </AuthFormContainer>
    </AuthPageLayout>
  );
};

/**
 * 카드 상단 컴포넌트
 */
const Header = () => {
  return (
    <HeaderContainer>
      <AuthTitle>Welcome back!</AuthTitle>
      <AuthSubTitle>Sign in to get the most out of AppleNote.</AuthSubTitle>
    </HeaderContainer>
  );
};

/**
 * 사용자 입력 폼 컴포넌트
 */
const Form = () => {
  return (
    <AuthInputContainer>
      <AuthInput Icon={FaRegUser} placeholder="Username" />
      <AuthInput Icon={FaKey} placeholder="Password" />
    </AuthInputContainer>
  );
};

/**
 * 이메일 상태 유지 체크박스 컴포넌트
 *
 * 회원가입 링크 컴포넌트
 */
const Options = () => {
  return (
    <AuthOptionsContainer>
      <Checkbox id="rememberMe" label="Remember Me" />
      <AuthOptionSubText>Create an account</AuthOptionSubText>
    </AuthOptionsContainer>
  );
};

/**
 * 로그인 요청 버튼 컴포넌트
 */
const Submit = () => {
  return (
    <AuthSubmitContainer>
      <AuthButton label="Login" />
    </AuthSubmitContainer>
  );
};

const AuthSubmitContainer = styled.div`
  margin-top: 13px;
`;

const AuthOptionsContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 11px;
`;

const AuthOptionSubText = styled.h4`
  cursor: pointer;
  color: ${({ theme }) => `${theme.text.secondary}80`};
  font-weight: 400;
  font-size: 12px;
  text-align: center;

  &:hover {
    color: ${({ theme }) => theme.text.secondary};
  }
`;

const HeaderContainer = styled.div`
  margin-bottom: 20px;
`;

export default Login;
