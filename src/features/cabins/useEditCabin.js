import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";

export const useEditCabin = () => {
    const queryClient = useQueryClient()
    const { mutate: editCabin, isLoading: isEditing } = useMutation({
        mutationFn: ({ newCabinData, id }) => createEditCabins(newCabinData, id),
        onSuccess: () => {
          toast.success("Cabin has been created");
          queryClient.invalidateQueries({
            queryKey: ["cabins"],
          });
        },
        onError: (err) => toast.error(err.message),
      });

      return {editCabin, isEditing}
}
