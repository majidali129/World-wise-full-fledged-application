import { useMutation, useQueryClient } from "@tanstack/react-query"
import { logout as ApiLogout } from "../../services/apiLogin"
import {useNavigate } from "react-router-dom"

export const useLogout = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    const {mutate:logout, isLoading } = useMutation({
        mutationFn: ApiLogout ,
        onSuccess: ()=> {
            queryClient.removeQueries()
            navigate('/login', {replace: true});
        }
    })

    return {logout, isLoading}
}