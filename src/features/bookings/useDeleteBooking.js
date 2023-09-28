import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as DeleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";


export const useDeleteBooking = () => {
    const QueryClient = useQueryClient()
    const { isLoading: isDeleting, mutate:deleteBooking } = useMutation({
        mutationFn: (id) => DeleteBooking(id),
        onSuccess: () => {
          toast.success("booking successfully deleted");
          QueryClient.invalidateQueries({
            queryKey: ["bookings"],
          });
        },
        
        onError: (error) => {
          toast.error(error.message);
        },
      });

      return {isDeleting, deleteBooking}
}
