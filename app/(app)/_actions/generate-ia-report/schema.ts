import { z } from "zod";

export const generateAiReportSchema = z.object({
  date: z.date(),
});

export type GenerateAiReportSchema = z.infer<typeof generateAiReportSchema>;
