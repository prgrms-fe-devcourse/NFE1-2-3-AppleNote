import styled from "styled-components";

interface ButtonProps {
  label: string;
  onClick?: () => void;
}

/**
 * AuthButton 컴포넌트
 *
 * @param props - Button 컴포넌트의 프로퍼티
 * @param props.label - 버튼 텍스트 라벨
 * @param props.onClick - 클릭 시 호출되는 콜백 함수
 */
const AuthButton: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <Button onClick={onClick}>{label}</Button>;
};

const Button = styled.button`
  outline: none;
  cursor: pointer;
  width: 100%;
  height: 58px;
  background-color: inherit;
  border: ${({ theme }) => `2px solid ${theme.text.secondary}`};
  border-radius: 10px;
  color: ${({ theme }) => `${theme.text.secondary}`};
  font-size: 20px;
  font-weight: 600;
  transition:
    background-color 0.2s,
    color 0.2s;

  &:hover {
    background-color: ${({ theme }) => `${theme.text.secondary}`};
    color: ${({ theme }) => `${theme.background.primary}`};
  }
`;

export default AuthButton;
