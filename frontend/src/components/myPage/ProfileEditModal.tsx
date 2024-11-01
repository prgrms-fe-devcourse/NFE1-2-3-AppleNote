import styled from "styled-components";
import { changeProfile } from "./userApi";
import { useState } from "react";

const closeBtn = "/closeBtn.png";
const DEFAULT_PROFILE_IMAGE = "/default-profile-image.png";

interface ImageEditModalProps {
  onClose: () => void;
}

//프로필 이미지 수정 모달
const ProfileEditModal: React.FC<ImageEditModalProps> = ({ onClose }) => {
  const isValidImageUrl = (url: string) => {
    return /^https?:\/\//i.test(url);
  };

  const [profileImage, setNewImg] = useState("");
  const handleConfirm = async () => {
    if (!isValidImageUrl(profileImage)) {
      alert("유효하지 않은 이미지 형식입니다.");
    } else {
      const isChangeSuccessful = await changeProfile({ profileImage });

      if (isChangeSuccessful) {
        alert("프로필 이미지가 변경되었습니다.");
        onClose();
      } else {
        alert("프로필 이미지 변경에 실패했습니다.");
      }
    }
  };
  const handleDefault = async () => {
    const isChangeSuccessful = await changeProfile({ profileImage: DEFAULT_PROFILE_IMAGE });

    if (isChangeSuccessful) {
      alert("프로필 이미지가 변경되었습니다.");
      onClose();
    } else {
      alert("프로필 이미지 변경에 실패했습니다.");
    }
  };

  return (
    <>
      <ModalOverlay>
        <ModalContent>
          <Header>
            <h3>프로필 이미지 변경</h3>
            <CloseButton onClick={onClose}>
              <img src={closeBtn} width="30px" />
            </CloseButton>
          </Header>
          <Input
            type="text"
            value={profileImage}
            onChange={(e) => setNewImg(e.target.value.trim())}
          />

          <ButtonWrapper>
            <Button onClick={handleConfirm}>변경</Button>
            <Button onClick={handleDefault}>삭제</Button>
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
const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
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
