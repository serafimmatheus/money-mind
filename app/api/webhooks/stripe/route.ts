import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (req: Request) => {
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.error();
  }

  const text = await req.text();
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.error();
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-10-28.acacia",
  });

  const event = await stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET,
  );

  switch (event.type) {
    case "invoice.paid":
      const { customer, subscription, subscription_details } = event.data
        .object as Stripe.Invoice;
      const clerk_user_id = subscription_details?.metadata?.clerk_user_id;

      if (!clerk_user_id) {
        return NextResponse.error();
      }

      await clerkClient.users.updateUser(clerk_user_id, {
        privateMetadata: {
          stripeCustomerId: customer,
          stripeSubscriptionId: subscription,
        },
        publicMetadata: {
          subscriptionPlan: "premium",
        },
      });

      break;

    case "customer.subscription.deleted":
      const subscriptionId = await stripe.subscriptions.retrieve(
        event.data.object.id as string,
      );
      const clerkUserId = subscriptionId.metadata.clerk_user_id;
      if (!clerkUserId) {
        return NextResponse.error();
      }

      await clerkClient.users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: null,
          stripeSubscriptionId: null,
        },
        publicMetadata: {
          subscriptionPlan: "basic",
        },
      });

      break;
  }

  return NextResponse.json({ received: true });
};
