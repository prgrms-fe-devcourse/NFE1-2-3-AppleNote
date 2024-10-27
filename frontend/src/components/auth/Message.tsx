import styled from "styled-components";

import { useAuth } from "./useAuth";

const AuthMessage = () => {
  const {
    state: { message },
  } = useAuth();

  return <Message>{message}</Message>;
};

const Message = styled.p`
  color: ${({ theme }) => `${theme.text.warning}`};
  font-size: 12px;
  font-weight: 600;
  min-height: 20px;
  margin: 10px 0;
  text-align: center;
`;

export default AuthMessage;
