import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogIn } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Logo from "../_components/logo";

const LoginPage = async () => {
  const { userId } = await auth();

  if (userId) {
    redirect("/");
  }
  return (
    <div className="grid h-full grid-cols-1 md:grid-cols-2">
      <div className="mx-auto flex h-full w-full max-w-[500px] flex-col justify-center gap-6 px-5 md:px-8">
        <Logo />

        <h2 className="text-4xl font-semibold">Bem-vindo</h2>

        <p className="text-muted-foreground">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para
          monitorar suas movimentações, e oferecer insights personalizados,
          facilitando o controle do seu orçamento.
        </p>

        <SignInButton>
          <Button variant="outline">
            <LogIn />
            Fazer login
          </Button>
        </SignInButton>
      </div>

      <div className="relative hidden h-full w-full md:flex">
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
