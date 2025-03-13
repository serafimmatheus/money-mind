"use client";

import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "../_actions/create-stripe-checkout";
import { loadStripe } from "@stripe/stripe-js";

const ButtonPro = () => {
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

  return (
    <Button
      onClick={handleAcquirePlanClick}
      className="w-full rounded-full border border-primary bg-primary text-secondary"
    >
      Adquirir agora
    </Button>
  );
};

export default ButtonPro;
