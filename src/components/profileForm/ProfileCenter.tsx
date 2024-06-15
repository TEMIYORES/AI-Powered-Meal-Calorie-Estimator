import { ReactNode } from "react";
import styled from "styled-components";

const ProfileCenter = ({ children }: { children: ReactNode }) => {
  return <StyledDiv>{children}</StyledDiv>;
};
const StyledDiv = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 600px;
  align-self: center;
`;
export default ProfileCenter;
