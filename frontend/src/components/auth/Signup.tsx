import styled from "styled-components";
import { FaKey, FaRegUser } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

import { AuthHeaderContainer, AuthTitle } from "./Header";
import { AuthInput, AuthInputContainer } from "./Input";
import { AuthFormContainer, AuthPageLayout } from "./Layout";
import AuthButton from "./Button";
import { AuthProvider } from "./AuthContext";
import Message from "./Message";
import { useAuth } from "./useAuth";
import { requestCheckEmail } from "./api";

const Signup = () => {
  return (
    <AuthPageLayout>
      <AuthFormContainer>
        <Header />
        <AuthProvider>
          <Form />
          <Message />
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

enum EmailStatus {
  ALLOWED = "Allowed",
  CHECK = "Check",
}

/**
 * 이메일 입력 컴포넌트
 *
 * 이메일 검증 버튼이 포함되어 있다.
 */
const Email = () => {
  const allowedEmailList = useRef(new Set<string>());
  const [emailCheckStatus, setEmailCheckStatus] = useState<EmailStatus>(EmailStatus.CHECK);
  const {
    state: { email, message },
    dispatch,
  } = useAuth();

  const isReady = emailCheckStatus === EmailStatus.ALLOWED || !(email.length > 0);

  useEffect(() => {
    if (allowedEmailList.current.has(email)) {
      return setEmailCheckStatus(EmailStatus.ALLOWED);
    }

    setEmailCheckStatus(EmailStatus.CHECK);
  }, [email]);

  // 이메일 입력 이벤트 핸들러
  const onChangeHandler = (value: string) => {
    if (message) dispatch.message("");
    dispatch.email(value);
  };

  // 이메일 체크 요청 핸들러
  const onSubmitHandler = async () => {
    try {
      const { statusCode } = await requestCheckEmail({ email: email });

      if (statusCode >= 200) {
        allowedEmailList.current.add(email);
        setEmailCheckStatus(EmailStatus.ALLOWED);
      }
    } catch {
      dispatch.message("Failed to check email. Please try again.");
    }
  };

  return (
    <EmailContainer>
      <EmailInputContainer>
        <AuthInput
          Icon={FaRegUser}
          type="email"
          placeholder="Email"
          value={email}
          onChange={onChangeHandler}
        />
      </EmailInputContainer>
      <CheckButtonContainer>
        <AuthButton
          disabled={isReady}
          fontSize={18}
          label={emailCheckStatus}
          onClick={onSubmitHandler}
        />
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
  flex: 0.7;
`;

const CheckButtonContainer = styled.div`
  flex: 0.3;
`;

export default Signup;
