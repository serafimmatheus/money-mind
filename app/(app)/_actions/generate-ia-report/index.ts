"use server";

import { db } from "@/app/_lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { endOfMonth, startOfMonth } from "date-fns";
import OpenAI from "openai";
import { GenerateAiReportSchema, generateAiReportSchema } from "./schema";

export const generateIaReport = async ({ date }: GenerateAiReportSchema) => {
  generateAiReportSchema.parse({ date });
  const { userId } = auth();

  if (!userId) {
    throw new Error("User is not authenticated");
  }

  const user = await clerkClient.users.getUser(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const hasPremiumPlan = user.publicMetadata?.subscriptionPlan === "premium";

  if (!hasPremiumPlan) {
    throw new Error("User does not have a premium plan");
  }

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set");
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const transactions = await db.transaction.findMany({
    where: {
      userId,
      createdAt: {
        gte: startOfMonth(new Date(date)),
        lt: endOfMonth(new Date(date)),
      },
    },
  });

  const content = `Gere um relatório com insights sobre as minhas finanças, com dicas e orientações de como melhorar a minha saúde financeira. As transações estão divididas por ponto e virgula. A estrutura de cada uma é {DATA}-{TIPO-{VALOR}-{CATEGORIA}. São elas:
  ${transactions
    .map(
      (transactions) =>
        `${transactions.date.toLocaleDateString("pt-BR")}-R$${transactions.amount}-${transactions.type}-${transactions.category}`,
    )
    .join(";")}`;

  const completions = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Você é especialista em gestão e organização de finanças pessoais. Você ajuda as pessoas a organizarem melhor as suas finanças.",
      },
      {
        role: "user",
        content,
      },
    ],
  });

  return completions.choices[0].message.content;
};
