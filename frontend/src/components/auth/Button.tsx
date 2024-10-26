import styled from "styled-components";

interface ButtonProps {
  label: string;
  onClick?: () => void;
}

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
