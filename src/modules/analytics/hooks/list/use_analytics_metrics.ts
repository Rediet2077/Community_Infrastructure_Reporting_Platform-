"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAnalyticsMetrics, ANALYTICS_METRICS_QUERY_KEY } from "./analytics_metrics";

export function useAnalyticsMetrics() {
  return useQuery({
    queryKey: ANALYTICS_METRICS_QUERY_KEY,
    queryFn: fetchAnalyticsMetrics,
  });
}
