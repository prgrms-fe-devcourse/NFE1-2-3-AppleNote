import styled from "styled-components";
import { FaRegUser } from "react-icons/fa6";
import { FaKey } from "react-icons/fa6";

import { AuthFormContainer, AuthPageLayout } from "./Layout";
import AuthInput from "./Input";
import Checkbox from "@common/components/CheckBox";
import AuthButton from "./Button";
import { AuthTitle, AuthSubTitle } from "./Header";

const Login = () => {
  return (
    <AuthPageLayout>
      <AuthFormContainer>
        <AuthHeader />
        <AuthForm />
        <AuthOptions />
        <AuthSubmit />
      </AuthFormContainer>
    </AuthPageLayout>
  );
};

const AuthHeader = () => {
  return (
    <HeaderContainer>
      <AuthTitle>Welcome back!</AuthTitle>
      <AuthSubTitle>Sign in to get the most out of AppleNote.</AuthSubTitle>
    </HeaderContainer>
  );
};

const AuthForm = () => {
  return (
    <InputContainer>
      <AuthInput Icon={FaRegUser} placeholder="Username" />
      <AuthInput Icon={FaKey} placeholder="Password" />
    </InputContainer>
  );
};

const AuthSubmit = () => {
  return (
    <AuthSubmitContainer>
      <AuthButton label="Login" />
    </AuthSubmitContainer>
  );
};

const AuthOptions = () => {
  return (
    <AuthOptionsContainer>
      <Checkbox id="rememberMe" label="Remember Me" />
      <AuthOptionSubText>Forgot Password?</AuthOptionSubText>
    </AuthOptionsContainer>
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
`;

const HeaderContainer = styled.div`
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export default Login;
