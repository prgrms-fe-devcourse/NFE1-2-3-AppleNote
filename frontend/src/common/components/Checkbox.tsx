import { ChangeEvent } from "react";
import styled from "styled-components";

interface CheckBoxProps {
  id: string;
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

const Checkbox: React.FC<CheckBoxProps> = ({ id, label, value, onChange }) => {
  const onChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
    return onChange?.(target.checked ?? false);
  };

  return (
    <CheckboxContainer>
      <HiddenCheckbox type="checkbox" id={id} checked={value} onChange={onChangeHandler} />
      <CustomCheckbox htmlFor={id}>{label}</CustomCheckbox>
    </CheckboxContainer>
  );
};

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input`
  display: none; /* 기본 체크박스 숨기기 */
`;

const CustomCheckbox = styled.label`
  color: ${({ theme }) => `${theme.text.primary}80`};
  cursor: pointer;
  font-size: 12px;
  position: relative;
  padding-left: 22px;
  padding-top: 1px;

  &::before {
    border-radius: 5px;
    border: ${({ theme }) => `1px solid ${theme.text.secondary}`};
    background-color: ${({ theme }) => `${theme.background.primary}`};
    transition:
      background-color 0.3s,
      border-color 0.3s;
    content: "";
    height: 17px;
    left: 0;
    position: absolute;
    top: 0;
    width: 18px;
  }

  &:hover::before {
    background-color: ${({ theme }) => `${theme.text.secondary}80`};
  }

  ${HiddenCheckbox}:checked + &::before {
    background-color: ${({ theme }) => `${theme.text.secondary}`};
  }

  ${HiddenCheckbox}:checked + &::after {
    content: "";
    height: 17px;
    left: 0;
    position: absolute;
    top: 0;
    width: 18px;
    background-image: ${({ theme }) =>
      `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='17' viewBox='0 0 24 24'%3E %3Cpath d='M15.88 8.29L10 14.17l-1.88-1.88a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7a.996.996 0 0 0 0-1.41c-.39-.39-1.03-.39-1.42 0z'  fill='%23${theme.background.primary.replace("#", "")}'/%3E %3C/svg%3E");`};
  }
`;

export default Checkbox;
