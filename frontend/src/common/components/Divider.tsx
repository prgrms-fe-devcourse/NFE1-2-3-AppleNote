import styled from "styled-components";

const Divider = styled.div<{ small?: boolean }>`
  height: ${({ small }) => (small ? "2px" : "3px")};
  border-top: ${({ small }) => (small ? "4px" : "7px")} solid;
`;

export default Divider;
