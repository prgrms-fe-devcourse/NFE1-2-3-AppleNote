import React, { useState } from "react";
import styled from "styled-components";
import { changePassword } from "./userApi"; // changePassword API 함수 임포트

interface ChangePwProps {
  setStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangePw: React.FC<ChangePwProps> = ({ setStatus }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validatePasswordFormat = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    return passwordRegex.test(password);
  };

  const handleConfirm = async () => {
    if (newPassword === confirmPassword) {
      if (validatePasswordFormat(newPassword)) {
        try {
          const isSuccess = await changePassword({
            oldPassword: currentPassword, // 기존 비밀번호
            newPassword: newPassword, // 새 비밀번호
          });

          if (isSuccess === true) {
            setErrorMessage(null);
            alert("비밀번호가 성공적으로 변경되었습니다.");
            setStatus(false);
          } else {
            setErrorMessage("기존 비밀번호가 일치하지 않습니다.");
            setSuccessMessage(null);
          }
        } catch {
          setErrorMessage("서버 오류가 발생했습니다.");
          setSuccessMessage(null);
        }
      } else {
        setErrorMessage(
          "새 비밀번호는 최소 8자 이상, 대문자, 소문자, 숫자 및 특수문자를 포함해야 합니다."
        ); // 새 비밀번호 형식 검증
      }
    } else {
      setErrorMessage("새 비밀번호와 비밀번호 확인이 일치하지 않습니다."); // 새 비밀번호와 비밀번호 확인 일치 검증
    }
  };

  const handleCancel = () => {
    setStatus(false); // 비밀번호 변경 모드를 종료할 때 상태를 false로 변경
  };

  return (
    <Container>
      <h2>비밀번호 변경</h2>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      <InputWrapper>
        <Label>기존 비밀번호</Label>
        <Input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
      </InputWrapper>
      <InputWrapper>
        <Label>새 비밀번호</Label>
        <Input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </InputWrapper>
      <InputWrapper>
        <Label>새 비밀번호 확인</Label>
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </InputWrapper>
      <ButtonWrapper>
        <Button onClick={handleConfirm}>확인</Button>
        <Button onClick={handleCancel}>취소</Button>
      </ButtonWrapper>
    </Container>
  );
};

// 스타일 컴포넌트
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const InputWrapper = styled.div`
  margin-bottom: 15px;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const SuccessMessage = styled.div`
  color: green;
  margin-bottom: 10px;
`;

export default ChangePw;
