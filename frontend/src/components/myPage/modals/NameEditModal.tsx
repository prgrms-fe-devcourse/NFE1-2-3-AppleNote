import styled from "styled-components";
import { changeName } from "../api/userApi";
import { useState } from "react";

const closeBtn = "/closeBtn.png";

interface NameEditModalProps {
  onClose: () => void;
}
const NameEditModal: React.FC<NameEditModalProps> = ({ onClose }) => {
  const [name, setNewName] = useState("");
  const handleConfirm = async () => {
    const isChangeSuccessful = await changeName({ name });

    if (isChangeSuccessful) {
      alert("The name has been changed.");
      onClose();
    } else {
      alert("Failed to change the name.");
    }
  };

  return (
    <>
      {" "}
      <ModalOverlay>
        <ModalContent>
          <Header>
            <h3>Name</h3>
            <CloseButton onClick={onClose}>
              <img src={closeBtn} width="30px" />
            </CloseButton>
          </Header>
          <Input type="text" value={name} onChange={(e) => setNewName(e.target.value.trim())} />
          <ButtonWrapper>
            <Button onClick={handleConfirm}>Confirm</Button>
            <Button onClick={onClose}>Close</Button>
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

export default NameEditModal;
