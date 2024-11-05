import React, { useState } from "react";
import styled from "styled-components";
import { changePassword } from "./api/userApi"; // changePassword API 함수 임포트

interface ChangePwProps {
  setStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangePw: React.FC<ChangePwProps> = ({ setStatus }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validatePasswordFormat = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    return passwordRegex.test(password);
  };

  const handleConfirm = async () => {
    if (newPassword !== confirmPassword) {
      return setErrorMessage("New password and confirm password do not match."); // 새 비밀번호와 비밀번호 확인 일치 검증
    }
    if (!validatePasswordFormat(newPassword)) {
      return setErrorMessage(
        "New password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters."
      );
    }

    try {
      const isSuccess = await changePassword({
        oldPassword: currentPassword, // 기존 비밀번호
        newPassword: newPassword, // 새 비밀번호
      });

      if (isSuccess === true) {
        setErrorMessage(null);
        alert("Password has been successfully changed.");
        setStatus(false);
      } else {
        setErrorMessage("Current password does not match.");
      }
    } catch {
      setErrorMessage("A server error has occurred.");
    }
  };

  const handleCancel = () => {
    setStatus(false); // 비밀번호 변경 모드를 종료할 때 상태를 false로 변경
  };

  return (
    <Wrapper>
      <Container>
        <h2>Change Password</h2>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <InputWrapper>
          <Label>Current Password</Label>
          <Input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </InputWrapper>
        <InputWrapper>
          <Label>New Password</Label>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Confirm New Password</Label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </InputWrapper>
        <ButtonWrapper>
          <Button onClick={handleConfirm}>Confirm</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </ButtonWrapper>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: -5.5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 50%;
`;

const InputWrapper = styled.div`
  margin-bottom: 2vh;
  width: 100%;
`;

const Label = styled.label`
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
  justify-content: flex-end;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-left: 20px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;

export default ChangePw;
