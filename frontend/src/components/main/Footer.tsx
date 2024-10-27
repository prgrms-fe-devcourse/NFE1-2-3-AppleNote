import React from "react";
import styled from "styled-components";

const Footer: React.FC = () => (
  <FooterContainer>
    <FooterContent>© 2024 AppleNote. All Rights Reserved.</FooterContent>
  </FooterContainer>
);

const FooterContainer = styled.footer`
  width: 100%;
  background-color: #333;
  color: white;
  text-align: center;
  padding: 1rem;
  position: fixed; /* 페이지 하단에 고정 */
  bottom: 0;
  left: 0;
`;

const FooterContent = styled.p`
  margin: 0;
  font-size: 1rem;
`;

export default Footer;
