import styled from "styled-components";
import { FaKey, FaEnvelope, FaRegUser } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthTitle } from "./Header";
import { AuthInput } from "./Input";
import {
  AuthFormContainer,
  AuthHeaderContainer,
  AuthInputContainer,
  AuthPageLayout,
  AuthOptionsContainer as OptionsContainer,
} from "./Layout";
import AuthButton from "./Button";
import { AuthFormProvider } from "./AuthContext";
import Message from "./Message";
import { useAuth } from "./useAuth";
import { requestCheckEmail, requestSignup } from "./api";
import { AuthOptionSubText } from "./Text";
import useFetch from "@common/hooks/useFetch";
import { setDefaultsHeaderAuth } from "@common/api/fetch";
import { localStorageHelper } from "@common/utils/localStorageHelper";

const Signup = () => {
  return (
    <AuthPageLayout>
      <AuthFormContainer>
        <Header />
        <AuthFormProvider>
          <Form />
          <Message />
        </AuthFormProvider>
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
      <UserName />
      <Password />
      <Options />
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
  const {
    state: { email, message },
    dispatch,
  } = useAuth();
  const { allowEmail, isValid, emailStatus } = useEmailValidation(email, () => {
    dispatch.message("Please enter a valid email address.");
  });

  const isReady = !isValid || emailStatus === EmailStatus.ALLOWED;

  // 이메일 입력 이벤트 핸들러
  const onChangeHandler = (value: string) => {
    if (message) dispatch.message("");
    dispatch.email(value);
  };

  // 이메일 체크 요청 핸들러
  const onSubmitHandler = async () => {
    try {
      const { statusCode } = await requestCheckEmail({ email });

      if (statusCode >= 200) {
        allowEmail(email);
      }
    } catch {
      dispatch.message("The email already exists. Please enter a different email.");
    }
  };

  return (
    <EmailContainer>
      <EmailInputContainer>
        <AuthInput
          Icon={FaEnvelope}
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
          label={emailStatus}
          onClick={onSubmitHandler}
        />
      </CheckButtonContainer>
    </EmailContainer>
  );
};

const useEmailValidation = (email: string, onValid: () => void) => {
  const allowedEmailList = useRef(new Set<string>());
  const [emailStatus, setEmailStatus] = useState<EmailStatus>(EmailStatus.CHECK);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValid = emailRegex.test(email);

  const allowEmail = (value: string) => {
    allowedEmailList.current.add(value);
    setEmailStatus(EmailStatus.ALLOWED);
  };
  const hasEmail = allowedEmailList.current.has(email);

  useEffect(() => {
    if (hasEmail) {
      return setEmailStatus(EmailStatus.ALLOWED);
    }

    if (email.length > 0 && !isValid) {
      return setEmailStatus(EmailStatus.CHECK);
    }
  }, [email, hasEmail, isValid]);

  useEffect(() => {
    if (hasEmail) {
      return setEmailStatus(EmailStatus.ALLOWED);
    }

    // 이메일 유효성 검사
    if (email.length > 0 && !isValid) {
      onValid();

      return setEmailStatus(EmailStatus.CHECK);
    }

    setEmailStatus(EmailStatus.CHECK);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  return {
    emailStatus,
    setEmailStatus,
    allowEmail,
    hasEmail,
    isValid,
  };
};

/**
 * 사용자 이름 컴포넌트
 */
const UserName = () => {
  const {
    state: { username },
    dispatch,
  } = useAuth();

  return (
    <AuthInput
      Icon={FaRegUser}
      placeholder="Username"
      value={username}
      onChange={dispatch.username}
    />
  );
};

/**
 * 비밀번호 입력 컴포넌트
 */
const Password = () => {
  const {
    state: { password, passwordConfirm },
    dispatch,
  } = useAuth();

  const onChangeHandler = (value: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    // 에러 메시지를 “스택 자료구조” 방식으로 처리 (LIFO)
    // 먼저 발생한 에러를 우선적으로 보여주고, 그 에러가 해결된 후 다음 에러를 보여줄 수 있도록 한다.
    const messages: string[] = [];

    dispatch.passwordConfirm(value);

    if (!passwordRegex.test(value)) {
      messages.push(
        "Requires at least one lowercase, uppercase, number, special character (@$!%*?&), and length of 8 to 20 characters."
      );
    }

    if (value !== password) {
      messages.push("Passwords do not match.");
    }

    if (messages.length > 0) {
      return dispatch.message(messages.pop() ?? "");
    }

    return dispatch.message("");
  };

  return (
    <>
      <AuthInput
        Icon={FaKey}
        placeholder="Password"
        value={password}
        onChange={dispatch.password}
      />
      <AuthInput
        Icon={FaKey}
        placeholder="Password Confirm"
        value={passwordConfirm}
        onChange={onChangeHandler}
      />
    </>
  );
};

/**
 *
 * 로그인 링크 컴포넌트
 */
const Options = () => {
  const navigate = useNavigate();

  // 회원가입 링크
  const onClickHandler = () => {
    navigate("/login");
  };

  return (
    <AuthOptionsContainer>
      <AuthOptionSubText onClick={onClickHandler}>Already have an account?</AuthOptionSubText>
    </AuthOptionsContainer>
  );
};

/**
 * 회원가입 요청 버튼 컴포넌트
 */
const Submit = () => {
  const {
    state: { email, password, passwordConfirm, username: name },
    dispatch,
  } = useAuth();
  const {
    state: { data, loading, error },
    request,
  } = useFetch(requestSignup, { delay: 500 });
  const navigate = useNavigate();

  const isReady = email && password && passwordConfirm && password === passwordConfirm && name;
  const buttonLabel = loading ? "Signing up…" : "signup";

  // 회원가입 요청 핸들러
  const onSubmitHandler = () => {
    dispatch.message("");
    request({
      email,
      name,
      password,
    });
  };

  useEffect(() => {
    const storage = localStorageHelper("user", { accessToken: "", userId: "" });
    const isFulfilled = !loading && data && data.payload && data.payload.accessToken;

    // 회원가입이 성공한 시점
    if (isFulfilled) {
      const { accessToken, userId } = data.payload;

      setDefaultsHeaderAuth(accessToken);
      storage.set({ accessToken, userId });
      navigate("/", { replace: true });
    }
  }, [data, loading, navigate]);

  useEffect(() => {
    if (!error) return;

    const { data } = error.response ?? {
      data: { error: { statusCode: 500, message: "Failed to signup. Please try again." } },
    };

    dispatch.message(`Failed to signup. ${data.error.message}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return <AuthButton label={buttonLabel} disabled={!isReady} onClick={onSubmitHandler} />;
};

const AuthOptionsContainer = styled(OptionsContainer)`
  justify-content: flex-end;
`;

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
