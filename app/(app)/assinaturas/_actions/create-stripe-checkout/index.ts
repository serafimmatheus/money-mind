"use server";

import { auth } from "@clerk/nextjs/server";
import Stripe from "stripe";

export const createStripeCheckout = async () => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Usuário não autenticado");
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Chave secreta do Stripe não definida");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-10-28.acacia",
  });

  if (!process.env.NEXT_PUBLIC_APP_URL) {
    throw new Error("URL do aplicativo não definida");
  }

  if (!process.env.STRIPE_PREMIUM_PLAN_PRICE_ID) {
    throw new Error("ID do preço do plano premium não definido");
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    subscription_data: {
      metadata: {
        clerk_user_id: userId,
      },
    },
    line_items: [
      {
        price: process.env.STRIPE_PREMIUM_PLAN_PRICE_ID,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/assinaturas/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/assinaturas/cancel`,
  });

  return {
    sessionId: session.id,
  };
};
