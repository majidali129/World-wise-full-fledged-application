import styled from 'styled-components';
import Filter from './Filter';
import SortBy from './SortBy';

const StyledTableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;



const TableOperations = ({children}) => {
  return (
    <StyledTableOperations>
     {children}
    </StyledTableOperations>
  )
}

export default TableOperations