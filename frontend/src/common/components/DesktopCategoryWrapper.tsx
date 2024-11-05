import React from "react";
import styled from "styled-components";

interface DesktopCategoryWrapperProps {
  children: React.ReactNode;
  marginTop?: number;
}

const DesktopCategoryWrapper: React.FC<DesktopCategoryWrapperProps> = ({
  children,
  marginTop = 200,
}) => {
  return <Wrapper $marginTop={marginTop}>{children}</Wrapper>;
};

const Wrapper = styled.div<{ $marginTop: number }>`
  display: block;
  margin-top: ${({ $marginTop }) => $marginTop}px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export default DesktopCategoryWrapper;
