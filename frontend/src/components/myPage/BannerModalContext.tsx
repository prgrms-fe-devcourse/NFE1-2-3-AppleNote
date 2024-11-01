import React, { createContext, useContext, useState, ReactNode } from "react";

// Context의 상태 타입 정의
interface BannerModalContextType {
  isBannerModalOpen: boolean;
  setBannerModalOpen: (open: boolean) => void;
}

// Context 생성
const BannerModalContext = createContext<BannerModalContextType>({
  isBannerModalOpen: false,
  setBannerModalOpen: () => {},
});

// Provider 컴포넌트
export const BannerModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isBannerModalOpen, setBannerModalOpen] = useState<boolean>(false);

  return (
    <BannerModalContext.Provider value={{ isBannerModalOpen, setBannerModalOpen }}>
      {children}
    </BannerModalContext.Provider>
  );
};

// Context를 사용하는 훅
export const useBannerModal = (): BannerModalContextType => {
  return useContext(BannerModalContext);
};
