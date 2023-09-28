import { useQuery } from "@tanstack/react-query"
import { getBooking } from "../../services/apiBookings"
import { useParams } from "react-router-dom"

export function useBooking() {
    const {bookingId} = useParams()
    const {data: booking, isLoading:loadingBooking, error} = useQuery({
        queryKey: ['bookings', bookingId],
        queryFn: () => getBooking(bookingId),
      })

      
      return {booking, loadingBooking, error, bookingId}
}

