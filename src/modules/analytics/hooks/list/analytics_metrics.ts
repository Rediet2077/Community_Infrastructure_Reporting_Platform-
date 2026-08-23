import { executeApiRequest } from "@/modules/shared/services/api_client";
import {
  AnalyticsMetrics,
  AnalyticsMetricsSchema,
} from "../../types/analytics_types";

export const ANALYTICS_METRICS_QUERY_KEY = ["analytics", "metrics"] as const;

export async function fetchAnalyticsMetrics(): Promise<AnalyticsMetrics> {
  return executeApiRequest({
    endpoint: "/analytics/metrics",
    method: "GET",
    outputSchema: AnalyticsMetricsSchema,
    mockFallback: () => ({
      avgIntakeHours: 2.3,
      avgResolutionDays: 3.4,
      slaCompliancePercent: 89.4,
      aiDuplicateMerges: 142,
    }),
  });
}
