import { z } from "zod";

export const AnalyticsMetricsSchema = z.object({
  avgIntakeHours: z.number(),
  avgResolutionDays: z.number(),
  slaCompliancePercent: z.number(),
  aiDuplicateMerges: z.number(),
});
export type AnalyticsMetrics = z.infer<typeof AnalyticsMetricsSchema>;
