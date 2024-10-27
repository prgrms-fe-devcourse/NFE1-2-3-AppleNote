import React, { PropsWithChildren } from "react";
import Header from "@components/main/Header";
import Banner from "@components/main/Banner";
import styled from "styled-components";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "@components/main/Footer";

const AppLayout: React.FC = () => {
  const location = useLocation();

  // 현재 경로가 "/"일 때만 Banner를 표시, 추후 설정 페이지의 경로까지 추가해야함
  const showBanner = location.pathname === "/";

  // 포스트 상세 페이지에서는 Footer 숨기기(추후 랜딩 페이지에서도 숨기도록 추가 예정)
  const hideFooter = ["/posts/:postId"].some((path) =>
    location.pathname.match(new RegExp(`^${path.replace(":postId", "\\d+")}$`))
  );

  return (
    <>
      <ConditionalWrapper condition={showBanner}>
        <Header />
        {showBanner && <Banner />}
      </ConditionalWrapper>
      <MainContainer>
        <Outlet /> {/* 각 페이지별 자식 컴포넌트 렌더링 */}
      </MainContainer>
      {!hideFooter && <Footer />} {/* Footer 조건부 렌더링 */}
    </>
  );
};

// 조건부로 Header와 Banner를 감싸는 컴포넌트
interface ConditionalWrapperProps {
  condition: boolean;
}

const ConditionalWrapper: React.FC<PropsWithChildren<ConditionalWrapperProps>> = ({
  condition,
  children,
}) => {
  return condition ? <>{children}</> : <Header />; // 홈 페이지 외에는 Header만 표시
};

const MainContainer = styled.div`
  margin-top: 20px;
  padding: 0 1rem;
  padding-bottom: 4rem; /* Footer 높이만큼 여백 추가 */
  min-height: 100vh; /* 화면 전체를 채우기 위해 설정 */
  box-sizing: border-box;
`;

export default AppLayout;
