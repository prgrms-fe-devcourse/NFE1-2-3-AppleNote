import styled from "styled-components";
import { changeName } from "./userApi";

interface NameEditModalProps {
  onClose: () => void;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}
const NameEditModal: React.FC<NameEditModalProps> = ({ onClose, name, setName }) => {
  const handleConfirm = async () => {
    const isChangeSuccessful = await changeName({ name });

    if (isChangeSuccessful) {
      alert("이름이 변경되었습니다.");
      onClose(); // 모달 닫기
    } else {
      alert("이름 변경에 실패했습니다.");
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h3>이름 변경</h3>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={handleConfirm}>확인</button>
        <button onClick={onClose}>닫기</button>
      </ModalContent>
    </ModalOverlay>
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
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
`;

export default NameEditModal;
