import React from "react";
import styled from "styled-components";

const Footer: React.FC = () => (
  <FooterContainer>
    <FooterContent>© 2024 AppleNote. All Rights Reserved.</FooterContent>
  </FooterContainer>
);

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.footer.background};
  width: 100%;
  color: white;
  text-align: center;
  padding: 1rem 0;
  margin-top: auto; /* 페이지 내용이 짧을 때 Footer가 하단에 붙도록 처리 */
`;

const FooterContent = styled.p`
  margin: 0;
  font-size: 1rem;
`;

export default Footer;
