import React from "react";
import Button from "../../components/button";
import { Input } from "../../components/input";
import { Loader2Icon } from "lucide-react";
import { useLogin } from "./hooks/use-login";

const LoginPage: React.FC = () => {
  const { form, onSubmit, loadingSubmit } = useLogin();

  return (
    <div className="min-h-screen flex items-center">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-max sm:min-w-96 mx-auto p-4"
      >
        <h3 className="text-xl text-white mb-8">
          Ponto <span className="font-bold">Ilumeo</span>
        </h3>
        <Input
          name="username"
          label="Código de usuário"
          register={form.register}
          required="Username is required"
        />
        <Input
          name="password"
          label="Senha de acesso"
          type="password"
          register={form.register}
          required="Password is required"
        />
        <Button type="submit" className="w-full mt-4">
          {loadingSubmit && (
            <Loader2Icon className="size-4 md:size-5 animate-spin inline-block mr-2" />
          )}
          Entrar
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
