import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { formaterCurrentNumber } from "@/app/_lib/formaterCurrentNumber copy";
import { CheckIcon, XIcon } from "lucide-react";
import ButtonPro from "./_components/button-pro";

const SignaturePage = () => {
  return (
    <div className="container">
      <h1 className="text-2xl font-bold">Assinaturas</h1>
      <div className="mt-6 flex gap-6">
        <Card className="relative border-primary">
          <Badge className="absolute -left-1 -top-1 w-fit">Atual</Badge>
          <CardHeader className="items-center py-12">
            <CardTitle className="text-muted-foreground">
              Plano Básico
            </CardTitle>

            <div className="flex items-center gap-2">
              <p className="text-4xl font-bold text-secondary">
                {formaterCurrentNumber.format(0)}
              </p>
              <p className="text-primary"> /mês</p>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="py-6">
            <ul>
              <li className="flex items-center gap-4">
                <CheckIcon className="text-primary" size={16} />
                Apenas 10 transações por mês
              </li>

              <li className="flex items-center gap-4">
                <XIcon className="text-muted-foreground" size={16} />
                Relatórios de IA ilimitados
              </li>
            </ul>
          </CardContent>

          <CardFooter>
            <Button className="w-full rounded-full border border-primary bg-transparent text-secondary">
              Fazer upgrade
            </Button>
          </CardFooter>
        </Card>

        <Card className="relative">
          <CardHeader className="items-center py-12">
            <CardTitle className="text-muted-foreground">Plano PRO</CardTitle>

            <div className="flex items-center gap-2">
              <p className="text-4xl font-bold text-secondary">
                {formaterCurrentNumber.format(19.9)}
              </p>
              <p className="text-primary"> /mês</p>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="py-6">
            <ul>
              <li className="flex items-center gap-4">
                <CheckIcon className="text-primary" size={16} />
                Apenas 10 transações por mês
              </li>

              <li className="flex items-center gap-4">
                <CheckIcon className="text-primary" size={16} />
                Relatórios de IA ilimitados
              </li>
            </ul>
          </CardContent>

          <CardFooter>
            <ButtonPro />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignaturePage;
