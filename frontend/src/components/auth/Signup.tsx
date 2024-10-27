import styled from "styled-components";
import { FaKey, FaRegUser } from "react-icons/fa";

import { AuthHeaderContainer, AuthTitle } from "./Header";
import { AuthInput, AuthInputContainer } from "./Input";
import { AuthFormContainer, AuthPageLayout } from "./Layout";
import AuthButton from "./Button";
import { AuthProvider } from "./AuthContext";

const Signup = () => {
  return (
    <AuthPageLayout>
      <AuthFormContainer>
        <Header />
        <AuthProvider>
          <Form />
        </AuthProvider>
      </AuthFormContainer>
    </AuthPageLayout>
  );
};

/**
 * 카드 상단 컴포넌트
 */
const Header = () => {
  return (
    <AuthHeaderContainer>
      <AuthTitle>Welcome!</AuthTitle>
    </AuthHeaderContainer>
  );
};

/**
 * 사용자 입력 폼 컴포넌트
 */
const Form = () => {
  return (
    <AuthInputContainer>
      <Email />
      <Password />
      <Submit />
    </AuthInputContainer>
  );
};

/**
 * 이메일 입력 컴포넌트
 *
 * 이메일 검증 버튼이 포함되어 있다.
 */
const Email = () => {
  return (
    <EmailContainer>
      <EmailInputContainer>
        <AuthInput Icon={FaRegUser} placeholder="Email" />
      </EmailInputContainer>
      <CheckButtonContainer>
        <AuthButton label="Check" fontSize={18} />
      </CheckButtonContainer>
    </EmailContainer>
  );
};

/**
 * 비밀번호 입력 컴포넌트
 */
const Password = () => {
  return (
    <>
      <AuthInput Icon={FaKey} placeholder="Password" />
      <AuthInput Icon={FaKey} placeholder="Password Confirm" />
    </>
  );
};

/**
 * 회원가입 요청 버튼 컴포넌트
 */
const Submit = () => {
  return <AuthButton label="Signup" />;
};

const EmailContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const EmailInputContainer = styled.div`
  flex: 0.75;
`;

const CheckButtonContainer = styled.div`
  flex: 0.25;
`;

export default Signup;
