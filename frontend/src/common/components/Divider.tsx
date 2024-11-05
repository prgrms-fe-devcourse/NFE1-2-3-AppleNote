import styled from "styled-components";

const Divider = styled.div<{ $small?: boolean; $width: number }>`
  height: ${({ $small }) => ($small ? "clamp(4px, 1vw, 6px)" : "clamp(4px, 1.5vw, 7px)")};
  background-color: ${({ theme }) => theme.divider.background};
  width: ${({ $width }) => `${$width}px`};
`;

export default Divider;
