import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom"
import { getBookingsAfterDate } from "../../services/apiBookings";



export const useRecentBookings = () => {

    const [searchParams] = useSearchParams();
    
    const numOfDays = !searchParams.get('last')? 7 : Number(searchParams.get('last'));
    const queryDate = subDays(new Date(), numOfDays).toISOString();

    const {isLoading: loadingBookings, data: bookings} = useQuery({
        queryFn: () => getBookingsAfterDate(queryDate),
        queryKey: ['bookings', `last-${numOfDays}`],
    })

    return {bookings, loadingBookings, numOfDays}

}

