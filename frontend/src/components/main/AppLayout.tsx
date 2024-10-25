import React from "react";
import Header from "@components/main/Header";
import Banner from "@components/main/Banner";
import styled from "styled-components";
import { Outlet, useLocation } from "react-router-dom";

const AppLayout: React.FC = () => {
  const location = useLocation();

  // 현재 경로가 "/"일 때만 Banner를 표시
  const showBanner = location.pathname === "/";

  return (
    <>
      <ConditionalWrapper condition={showBanner}>
        <Header />
        {showBanner && <Banner />}
      </ConditionalWrapper>
      <MainContainer>
        <Outlet /> {/* 각 페이지별 자식 컴포넌트 렌더링 */}
      </MainContainer>
    </>
  );
};

// 조건부로 Header와 Banner를 감싸는 컴포넌트
const ConditionalWrapper: React.FC<{ condition: boolean; children: React.ReactNode }> = ({
  condition,
  children,
}) => {
  return condition ? <>{children}</> : <Header />; // 홈 페이지 외에는 Header만 표시
};

const MainContainer = styled.div`
  margin-top: 20px;
  padding: 0 1rem;
`;

export default AppLayout;
