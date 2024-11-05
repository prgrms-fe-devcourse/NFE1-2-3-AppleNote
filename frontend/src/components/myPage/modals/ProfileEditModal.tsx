import styled from "styled-components";
import { changeProfile } from "../api/userApi";
import { useState } from "react";

const closeBtn = "/closeBtn.png";
// const DEFAULT_PROFILE_IMAGE = "/default-profile-image.png";

interface ImageEditModalProps {
  onClose: () => void;
}

// 프로필 이미지 수정 모달
const ProfileEditModal: React.FC<ImageEditModalProps> = ({ onClose }) => {
  const [fileName, setFileName] = useState("");
  const [profileImage, setNewImg] = useState<File | null>(null);

  // 이미지 선택 핸들러
  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setNewImg(file);
      setFileName(file.name);
    } else {
      alert("No file was selected.");
    }
  };

  // 선택한 이미지로 변경
  const handleConfirm = async () => {
    if (profileImage) {
      const isChangeSuccessful = await changeProfile({ profileImage: profileImage });

      if (isChangeSuccessful) {
        alert("The profile image has been changed.");
        onClose();
      } else {
        alert("Failed to change the profile image.");
      }
    } else {
      alert("Please select an image to change.");
    }
  };

  // 기본이미지로 변경
  const handleDefault = async () => {
    const isChangeSuccessful = await changeProfile({ profileImage: null });

    if (isChangeSuccessful) {
      alert("The profile image has been changed to the default image.");
      onClose();
    } else {
      alert("Failed to change the profile image.");
    }
  };

  return (
    <>
      <ModalOverlay>
        <ModalContent>
          <Header>
            <h3>Profile Image</h3>
            <CloseButton onClick={onClose}>
              <img src={closeBtn} width="30px" />
            </CloseButton>
          </Header>
          <InputWrapper>
            <Input type="file" id="file-input" accept="image/*" onChange={handleImg} />
            <ButtonStyled htmlFor="file-input">Select File</ButtonStyled>
            {fileName && <FileName>{fileName}</FileName>}
          </InputWrapper>

          <ButtonWrapper>
            <Button onClick={handleConfirm}>Confirm</Button>
            <Button onClick={handleDefault}>Close</Button>
          </ButtonWrapper>
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  max-width: 90%;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
  background-color: #f9f9f9;
  cursor: pointer;
  display: none;
`;

const ButtonStyled = styled.label`
  padding: 15px 20px;
  margin-left: 10px;
  border: 1px solid #8f8f8f;
  border-radius: 5px;
  background-color: #7e7979;
  color: white;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: transparent;
    color: black;
  }
`;

const FileName = styled.p`
  margin-top: 10px;
  margin-left: 30px;
  font-size: 0.9rem;
  color: #555;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 3px 10px;
  border: 0.5px solid #ddd;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export default ProfileEditModal;
