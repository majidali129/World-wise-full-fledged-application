import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient()

  // FILTER
  const filteredValue = searchParams.get("status");
  const filter =
    !filteredValue || filteredValue === 'all'
      ? null
      // : {
      //     field: "status",
      //     value: filteredValue, 
      //   };
      : {
          field: "status",
          value: filteredValue, 
          method: 'gte'
        };

  // SORT
  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortByRaw.split('-')
  const sortBy = {field, direction};

  // PAGINATION
  const page = !searchParams.get("page")
  ? 1
  : Number(searchParams.get("page"));


  // QUERY
  const {
    data: {data:bookings, count} = {}, // without {} , it'll give error of data as undefined initially
    isLoading: loadingBookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({filter, sortBy, page}),
  });

  const pageCount = Math.ceil(count/PAGE_SIZE)
  // PRE-FETCHING

  // next page
  if(page < pageCount){
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page+1],
      queryFn: () => getBookings({filter, sortBy,  page: page + 1}),
    })
  }

  // previous page
  if(page > 1){
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({filter, sortBy,  page: page - 1}),
    })
  }

  return { bookings, loadingBookings, error, count };
}
