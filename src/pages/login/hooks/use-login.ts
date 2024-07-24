// hooks/useLogin.ts
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "../../../schemas/login-schema";
import useAuthStore from "../../../stores/AuthStore";
import { axiosGuestService } from "../../../services/axiosGuest.service";

export const useLogin = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const authStore = useAuthStore();
  const navigate = useNavigate();

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    const isAuthenticated = authStore.isAuthenticated;
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [authStore.isAuthenticated, navigate]);

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setLoadingSubmit(true);
    try {
      const response = await axiosGuestService.post("/auth/login", values);
      if (response.status !== 200) {
        window.alert("Erro ao efetuar login");
        return;
      }
      authStore.login(response.data.token);
      if (authStore.isAuthenticated && authStore.user) {
        navigate("/");
      }
    } catch (error) {
      window.alert("Erro ao efetuar login");
    } finally {
      setLoadingSubmit(false);
    }
  };

  return {
    form,
    onSubmit,
    loadingSubmit,
  };
};
