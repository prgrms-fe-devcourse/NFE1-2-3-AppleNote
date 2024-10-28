import styled from "styled-components";

import { useAuthForm } from "./useAuth";

const AuthMessage = () => {
  const {
    state: { message },
  } = useAuthForm();

  return <Message>{message}</Message>;
};

const Message = styled.p`
  color: ${({ theme }) => `${theme.text.warning}`};
  font-size: 12px;
  font-weight: 600;
  min-height: 36px;
  margin: 10px 0;
  text-align: center;
`;

export default AuthMessage;
