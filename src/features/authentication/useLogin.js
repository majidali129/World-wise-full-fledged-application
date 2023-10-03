import {useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiLogin";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient()

  const {mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password}) => loginApi({ email, password }),
    onSuccess: (user) => {
      toast.success(`User with ${user?.user?.email} successfully loged in`);
      navigate("/dashboard");
      queryClient.setQueryData(['user'], user?.user);
    },
    onError: (err) => {
      console.log("LoginError:: ", err);
      toast.error("Invalid user credentials");
    },
  });

  return { login, isLoading };
};
