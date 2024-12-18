import React, { PropsWithChildren } from "react";
import Header from "@components/main/Header";
import Banner from "@components/main/Banner";
import styled from "styled-components";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "@components/main/Footer";

const AppLayout: React.FC = () => {
  const location = useLocation();

  // 루트 경로('/')에서는 랜딩 페이지를 보여주고 다른 페이지는 Outlet을 통해 렌더링
  if (location.pathname === "/") {
    return <Outlet />;
  }

  // 현재 경로가 "/home" 혹은 "/setting"일 때만 Banner를 표시
  const showBanner = location.pathname === "/home" || location.pathname === "/setting";

  // 포스트 상세 페이지에서는 Footer 숨기기
  const hideFooter = ["/posts/:postId"].some((path) =>
    location.pathname.match(new RegExp(`^${path.replace(":postId", "\\d+")}$`))
  );

  return (
    <LayoutContainer>
      <ConditionalWrapper condition={showBanner}>
        <Header />
        {showBanner && <Banner />}
      </ConditionalWrapper>
      <MainContent>
        <Outlet /> {/* 각 페이지별 자식 컴포넌트 렌더링 */}
      </MainContent>
      {!hideFooter && <Footer />} {/* Footer 조건부 렌더링 */}
    </LayoutContainer>
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

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 화면 전체를 채우기 위해 설정 */
`;

const MainContent = styled.main`
  flex: 1; /* 남은 공간을 모두 차지 */
  padding: 1rem;
  margin-bottom: 150px;
`;

export default AppLayout;
