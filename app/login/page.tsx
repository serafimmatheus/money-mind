import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogIn } from "lucide-react";

const LoginPage = () => {
  return (
    <div className="grid h-full grid-cols-2">
      <div className="mx-auto flex h-full w-full max-w-[500px] flex-col justify-center gap-6 px-5 md:px-8">
        <h1 className="text-primary text-3xl font-bold">Money Mind</h1>

        <h2 className="text-4xl font-semibold">Bem-vindo</h2>

        <p className="text-muted-foreground">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para
          monitorar suas movimentações, e oferecer insights personalizados,
          facilitando o controle do seu orçamento.
        </p>

        <Button variant="outline">
          <LogIn />
          Fazer login
        </Button>
      </div>

      <div className="relative h-full w-full">
        <Image
          src="/login.png"
          alt="Login Image"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
