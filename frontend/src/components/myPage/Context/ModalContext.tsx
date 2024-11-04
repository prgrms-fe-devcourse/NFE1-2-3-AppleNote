import React, { createContext, useContext, useState, ReactNode } from "react";

// Context에서 관리할 상태 타입 정의
interface ModalContextType {
  isOpen: boolean; // 모달이 열려 있는지 여부
  setOpen: (open: boolean) => void; // 모달 열림 상태를 변경하는 함수
}

// Context 생성 및 초기값 설정
const ModalContext = createContext<ModalContextType>({
  isOpen: false, // 모달 초기값은 닫혀 있음
  setOpen: () => {}, // 기본 함수는 아무 동작하지 않음
});

// Provider 컴포넌트 정의
export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 모달 열림 여부를 관리하는 상태
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    // Context Provider를 통해 하위 컴포넌트에 상태와 함수 제공
    <ModalContext.Provider value={{ isOpen, setOpen }}>{children}</ModalContext.Provider>
  );
};

// Context를 쉽게 사용할 수 있는 커스텀 훅
export const useModal = (): ModalContextType => {
  // useContext를 통해 ModalContext의 상태와 함수 사용
  return useContext(ModalContext);
};
