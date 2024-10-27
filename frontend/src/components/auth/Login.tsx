import styled from "styled-components";
import { FaRegUser } from "react-icons/fa6";
import { FaKey } from "react-icons/fa6";

import { AuthFormContainer, AuthPageLayout } from "./Layout";
import AuthButton from "./Button";
import { AuthTitle, AuthSubTitle } from "./Header";
import { AuthInput, AuthInputContainer } from "./Input";
import Checkbox from "@common/components/Checkbox";
import { AuthProvider } from "./AuthContext";
import { useAuth } from "./useAuth";
import { useEffect } from "react";
import useFetch from "@common/hooks/useFetch";
import { requestLogin } from "./api";
import { localStorageHelper } from "@common/utils/localStorageHelper";

const LOCAL_STORAGE_KEY = "login_email";
const defaultStorageEmail = {
  isSave: false,
  email: "",
};

const Login = () => {
  return (
    <AuthPageLayout>
      <AuthFormContainer>
        <Header />
        <AuthProvider>
          <Form />
          <Options />
          <Submit />
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
  const { state, dispatch } = useAuth();

  const loadAndDispatchEmail = () => {
    const { email, isSave } = localStorageHelper(LOCAL_STORAGE_KEY, defaultStorageEmail).get();

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
    </AuthInputContainer>
  );
};

/**
 * 이메일 상태 유지 체크박스 컴포넌트
 *
 * 회원가입 링크 컴포넌트
 */
const Options = () => {
  const { state, dispatch } = useAuth();

  // 체크박스 핸들러
  const onChangeHandler = (value: boolean) => {
    dispatch.rememberMe(value);

    if (value === false) {
      localStorageHelper(LOCAL_STORAGE_KEY, defaultStorageEmail).remove();
    }
  };

  return (
    <AuthOptionsContainer>
      <Checkbox
        id="rememberMe"
        label="Remember Me"
        value={state.rememberMe}
        onChange={onChangeHandler}
      />
      <AuthOptionSubText>Create an account</AuthOptionSubText>
    </AuthOptionsContainer>
  );
};

/**
 * 로그인 요청 버튼 컴포넌트
 */
const Submit = () => {
  const {
    state: { email, password, rememberMe },
  } = useAuth();
  const {
    state: { data, loading },
    request,
  } = useFetch(requestLogin, { delay: 1000 });

  const isReady = !(email && password) || loading;
  const buttonLabel = loading ? "Logging in…" : "Login";

  // 체크박스 활성화된 경우 상태 저장
  const saveAndDispatchEmail = (email: string) => {
    localStorageHelper(LOCAL_STORAGE_KEY, defaultStorageEmail).set({ email, isSave: true });
  };

  const onSubmitHandler = () => {
    if (rememberMe) saveAndDispatchEmail(email);

    const payload = {
      email,
      password,
    };

    request(payload);
  };

  useEffect(() => {
    const isFulfilled = !loading && data && data.payload && data.payload.accessToken;

    // 로그인이 성공한 시점
    if (isFulfilled) {
      console.log(data);
    }
  }, [data, loading]);

  return (
    <AuthSubmitContainer>
      <AuthButton label={buttonLabel} disabled={isReady} onClick={onSubmitHandler} />
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
