import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins";
import CabinRow from "./CabinRow";
import Spinner from '../../ui/Spinner'
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;




const CabinTable = () => {
  const  {cabins, loadingCabins, error} = useCabins()
  
  const [searchParams] = useSearchParams();
  
  if(loadingCabins) return <Spinner />

  // A) FILTER 
  const cabinField = searchParams.get('discount') || 'all';
  let filteredCabins;

  if(cabinField === 'all') filteredCabins = cabins;
  if(cabinField === 'no-discount') filteredCabins = cabins?.filter(cabin => cabin?.discount === 0);
  if(cabinField === 'with-discount') filteredCabins = cabins?.filter(cabin => cabin?.discount > 0);  


  // B) SORT 
  const sortBy = searchParams.get('sortBy') || 'startDate-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins.sort((a,b) => (a[field] - b[field]) * modifier);

  return (
    <Menus>

    <Table columns= ' 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr ' >
      <Table.Header role="row">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      {/* {
        cabins.map((cabin) => <CabinRow key={cabin.id} cabin={cabin} />)
      } */}
      {/* Render prop pattern */}
      <Table.Body 
      // data={cabins} 
      // data={filteredCabins}
      data={sortedCabins}
      render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />} 
      />
    </Table>

    <Table.Footer >
    <Pagination />
    </Table.Footer>
      </Menus>
  )
}

export default CabinTable