import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";

export const useDeleteCabin = () => {
    const QueryClient = useQueryClient()
    const { isLoading: isDeleting, mutate:deleteCabin } = useMutation({
        mutationFn: (id) => deleteCabins(id),
        onSuccess: () => {
          toast.success("Cabin successfully deleted");
          QueryClient.invalidateQueries({
            queryKey: ["cabins"],
          });
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });

      return {isDeleting, deleteCabin}
}
