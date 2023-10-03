import { useMutation } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { signUp as ApiSignup } from "../../services/apiLogin"


export const useSignup = () => {
  const {mutate: signup, isLoading} = useMutation({
    mutationFn: ({email, password, fullName}) => {
      console.log(email,password,fullName)
      ApiSignup({email, password, fullName}) 
    },
    onSuccess: () => {
        toast.success('Account successfully created. Please verify the new account from the user\'s email')
    },

    onError: () => {
        toast.error('Something went wrong while creating the account! please wait or try again ')
    }
  })


    return {signup, isLoading}
}

