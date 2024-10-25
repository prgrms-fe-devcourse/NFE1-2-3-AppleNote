import { ChangeEvent } from "react";
import { IconType } from "react-icons";
import styled from "styled-components";
import { FaRegSquare } from "react-icons/fa6";

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

const defaultIconOptions: IconOptions = {
  size: 24,
  color: "#1C1C1C80",
};

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
    <InputContainer>
      <Icon {...iconOptions} />
      <Input placeholder={placeholder} value={value} onChange={onChangeHandler} />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  align-items: center;
  background-color: #f8f8f8;
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
  color: "#1C1C1C80";
  font-size: 16px;
  line-height: 24px;
  outline: none;
  padding-top: 4px;
  width: 100%;

  &::placeholder {
    color: rgba(28, 28, 28, 0.5);
  }

  &:focus {
    outline: none;
  }
`;

export default AuthInput;
