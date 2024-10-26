import { ChangeEvent } from "react";
import { IconType } from "react-icons";
import styled, { useTheme } from "styled-components";
import { FaRegSquare } from "react-icons/fa6";
import ThemeToggleButton from "@common/utils/ThemeToggleButton";

type IconOptions = {
  size: number;
  color: string;
};

interface InputProps {
  Icon: IconType;
  iconOptions?: IconOptions;
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
}

/**
 * AuthInput 컴포넌트
 *
 * @param props - Input 컴포넌트의 프로퍼티
 * @param props.Icon - 사용할 아이콘 컴포넌트
 * @param props.iconOptions - 아이콘의 크기와 색상 설정
 * @param props.placeholder - 입력 필드의 플레이스홀더 텍스트
 * @param props.value - 입력 필드의 값
 * @param props.onChange - 입력 값 변경 시 호출되는 콜백 함수
 *
 */
const AuthInput: React.FC<InputProps> = (props) => {
  const theme = useTheme();

  const defaultIconOptions: IconOptions = {
    size: 24,
    color: `${theme.text.secondary}80`,
  };

  const {
    Icon = FaRegSquare,
    iconOptions = defaultIconOptions,
    onChange,
    value,
    placeholder,
  } = props;

  const onChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
    return onChange?.(target.value);
  };

  return (
    <>
      <ThemeToggleButton />
      <InputContainer>
        <Icon {...iconOptions} />
        <Input placeholder={placeholder} value={value} onChange={onChangeHandler} />
      </InputContainer>
    </>
  );
};

const InputContainer = styled.div`
  align-items: center;
  background-color: ${({ theme }) => `${theme.background.secondary}`};
  border: none;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  gap: 15px;
  min-height: 58px;
  padding: 15px;
  width: 100%;
`;

const Input = styled.input`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => `${theme.text.secondary}`};
  font-size: 16px;
  line-height: 24px;
  outline: none;
  margin-top: 4px;
  width: 100%;

  &::placeholder {
    color: ${({ theme }) => `${theme.text.secondary}80`};
  }

  &:focus {
    outline: none;
  }
`;

export default AuthInput;
