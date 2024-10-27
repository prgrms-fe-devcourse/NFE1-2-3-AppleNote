import styled from "styled-components";

interface ButtonProps {
  disabled?: boolean;
  fontSize?: number;
  onClick?: () => void;
  label: string;
}

/**
 * AuthButton 컴포넌트
 *
 * @param props - Button 컴포넌트의 프로퍼티
 * @param props.label - 버튼 텍스트 라벨
 * @param props.onClick - 클릭 시 호출되는 콜백 함수
 * @param props.disabled - 버튼 비활성화 여부
 */
const AuthButton: React.FC<ButtonProps> = ({ label, onClick, disabled, fontSize = 20 }) => {
  return (
    <Button onClick={onClick} disabled={disabled} $size={fontSize}>
      {label}
    </Button>
  );
};

const Button = styled.button<{ $size?: number }>`
  outline: none;
  cursor: pointer;
  width: 100%;
  height: 58px;
  background-color: inherit;
  border: ${({ theme }) => `2px solid ${theme.text.secondary}`};
  border-radius: 10px;
  color: ${({ theme }) => `${theme.text.secondary}`};
  font-size: ${({ $size }) => `${$size}px`};

  font-weight: 600;
  transition:
    background-color 0.2s,
    color 0.2s;

  &:hover {
    background-color: ${({ theme }) => `${theme.text.secondary}`};
    color: ${({ theme }) => `${theme.background.primary}`};
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }

  &:disabled:hover {
    background-color: inherit;
    color: ${({ theme }) => `${theme.text.secondary}`};
  }
`;

export default AuthButton;
