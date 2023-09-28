import { styled } from "styled-components";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 3rem 8rem;
  border-bottom: 1px solid gray;
`;


const Header = () => {
  return <StyledHeader>Header</StyledHeader>;
};

export default Header;
