"use client";

import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "../_actions/create-stripe-checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const ButtonPro = () => {
  const { user } = useUser();
  const handleAcquirePlanClick = async () => {
    const { sessionId } = await createStripeCheckout();

    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("Chave pública do Stripe não definida");
    }

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    );

    if (!stripe) {
      throw new Error("Erro ao carregar o Stripe");
    }

    await stripe.redirectToCheckout({
      sessionId,
    });
  };

  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan === "premium";

  const STRIPE_CUSTOMER_PORTAL_URL =
    process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL;

  if (!STRIPE_CUSTOMER_PORTAL_URL) {
    throw new Error("URL do portal do cliente do Stripe não definida");
  }

  if (hasPremiumPlan) {
    return (
      <Button className="w-full rounded-full" variant="link">
        <Link
          href={`${STRIPE_CUSTOMER_PORTAL_URL}?prefilled_email=${user.emailAddresses[0].emailAddress}`}
        >
          Gerenciar plano
        </Link>
      </Button>
    );
  }
  return (
    <Button
      onClick={handleAcquirePlanClick}
      className="w-full rounded-full"
      variant="default"
    >
      Adquirir plano
    </Button>
  );
};

export default ButtonPro;
