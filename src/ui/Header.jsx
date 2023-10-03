import { styled } from "styled-components";
import UserAvatar from "../features/authentication/UserAvatar";
import HeaderMenu from "./HeaderMenu";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 3rem 8rem;
  border-bottom: 1px solid gray;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem; 
`;


const Header = () => {
  return <StyledHeader>
    <UserAvatar />
    <HeaderMenu />
  </StyledHeader>;
};

export default Header;
