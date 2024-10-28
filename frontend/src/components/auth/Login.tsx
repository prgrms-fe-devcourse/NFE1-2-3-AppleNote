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
import { useAuth } from "./useAuth";
import { useEffect } from "react";
import useFetch from "@common/hooks/useFetch";
import { requestLogin } from "./api";
import { localStorageHelper } from "@common/utils/localStorageHelper";
import Message from "./Message";
import { setDefaultsHeaderAuth } from "@common/api/fetch";
import { AuthOptionSubText } from "./Text";

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
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();

  // 체크박스 핸들러
  const onChangeHandler = (value: boolean) => {
    dispatch.rememberMe(value);

    if (value === false) {
      localStorageHelper(LOCAL_STORAGE_KEY, defaultStorageEmail).remove();
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
  } = useAuth();
  const {
    state: { data, loading, error },
    request,
  } = useFetch(requestLogin, { delay: 500 });
  const navigate = useNavigate();

  const isReady = !(email && password) || loading;
  const buttonLabel = loading ? "Logging in…" : "Login";

  // 체크박스 활성화된 경우 상태 저장
  const saveAndDispatchEmail = (email: string) => {
    localStorageHelper(LOCAL_STORAGE_KEY, defaultStorageEmail).set({ email, isSave: true });
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
    const storage = localStorageHelper("user", { accessToken: "", userId: "" });
    const isFulfilled = !loading && data && data.payload && data.payload.accessToken;

    // 로그인이 성공한 시점
    if (isFulfilled) {
      const { accessToken, userId } = data.payload;

      setDefaultsHeaderAuth(accessToken);
      storage.set({ accessToken, userId });
      navigate("/", { replace: true });
    }
  }, [data, loading, navigate]);

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
