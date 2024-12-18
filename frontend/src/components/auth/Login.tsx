import styled from "styled-components";
import { FaRegUser } from "react-icons/fa6";
import { FaKey } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import {
  AuthFormContainer,
  AuthOptionsContainer as OptionsContainer,
  AuthPageLayout,
  AuthInputContainer,
  AuthHeaderContainer,
} from "./Layout";
import AuthButton from "./Button";
import { AuthTitle, AuthSubTitle } from "./Header";
import { AuthInput } from "./Input";
import Checkbox from "@common/components/Checkbox";
import { AuthFormProvider } from "./AuthContext";
import { useAuth, useAuthForm } from "./useAuth";
import { useEffect } from "react";
import useFetch from "@common/hooks/useFetch";
import { requestLogin } from "./api";
import Message from "./Message";
import { AuthOptionSubText } from "./Text";
import { emailLocalStorage } from "./localStorage";

const Login = () => {
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
      <AuthTitle>Welcome back!</AuthTitle>
      <AuthSubTitle>Sign in to get the most out of AppleNote.</AuthSubTitle>
    </AuthHeaderContainer>
  );
};

/**
 * 사용자 입력 폼 컴포넌트
 */
const Form = () => {
  const { state, dispatch } = useAuthForm();

  const loadAndDispatchEmail = () => {
    const { email, isSave } = emailLocalStorage.get();

    if (isSave) {
      dispatch.email(email);
      dispatch.rememberMe(isSave);
    }
  };

  useEffect(() => {
    loadAndDispatchEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthInputContainer>
      <AuthInput
        Icon={FaRegUser}
        placeholder="Email"
        value={state.email}
        onChange={dispatch.email}
      />
      <AuthInput
        Icon={FaKey}
        type="password"
        placeholder="Password"
        value={state.password}
        onChange={dispatch.password}
      />
      <Options />
      <Submit />
    </AuthInputContainer>
  );
};

/**
 * 이메일 상태 유지 체크박스 컴포넌트
 *
 * 회원가입 링크 컴포넌트
 */
const Options = () => {
  const { state, dispatch } = useAuthForm();
  const navigate = useNavigate();

  // 체크박스 핸들러
  const onChangeHandler = (value: boolean) => {
    dispatch.rememberMe(value);

    if (value === false) {
      emailLocalStorage.remove();
    }
  };

  // 회원가입 링크
  const onClickHandler = () => {
    navigate("/signup");
  };

  return (
    <AuthOptionsContainer>
      <Checkbox
        id="rememberMe"
        label="Remember Me"
        value={state.rememberMe}
        onChange={onChangeHandler}
      />
      <AuthOptionSubText onClick={onClickHandler}>Create an account</AuthOptionSubText>
    </AuthOptionsContainer>
  );
};

/**
 * 로그인 요청 버튼 컴포넌트
 */
const Submit = () => {
  const {
    state: { email, password, rememberMe },
    dispatch,
  } = useAuthForm();
  const {
    state: { data, loading, error },
    request,
  } = useFetch(requestLogin, { delay: 500 });
  const { login } = useAuth();
  const navigate = useNavigate();

  const isReady = !(email && password) || loading;
  const buttonLabel = loading ? "Logging in…" : "Login";

  // 체크박스 활성화된 경우 상태 저장
  const saveAndDispatchEmail = (email: string) => {
    emailLocalStorage.set({ email, isSave: true });
  };

  // 로그인 요청 핸들러
  const onSubmitHandler = () => {
    if (rememberMe) saveAndDispatchEmail(email);

    dispatch.message("");
    request({
      email,
      password,
    });
  };

  useEffect(() => {
    const isFulfilled = !loading && data && data.payload && data.payload.accessToken;

    // 로그인이 성공한 시점
    if (isFulfilled) {
      login(data, {
        onSuccess: () => {
          navigate("/home", { replace: true });
        },
      });
    }
  }, [data, loading, login, navigate]);

  useEffect(() => {
    if (!error) return;

    dispatch.message("Failed to login. Please try again.");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return <AuthButton label={buttonLabel} disabled={isReady} onClick={onSubmitHandler} />;
};

const AuthOptionsContainer = styled(OptionsContainer)`
  justify-content: space-between;
`;

export default Login;
