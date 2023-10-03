import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { updateCurrentUser } from "../../services/apiLogin"


const useUpdateUser = () => {
    const queryClient = useQueryClient();

    const {mutate: updateUser, isLoading: isUpdating} = useMutation({
        // mutationFn: ({password, fullName, avatar}) => updateCurrentUser({password, fullName, avatar}),
        mutationFn: ({password, fullName, avatar}) =>  updateCurrentUser({password, fullName, avatar}),
        mutationKey: ['user'],
        onSuccess: () => {
            toast.success('User account successfully updated');
            queryClient.invalidateQueries({
                queryKey: ['user']
            })
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })
  

    return {updateUser, isUpdating}
}

export {useUpdateUser}