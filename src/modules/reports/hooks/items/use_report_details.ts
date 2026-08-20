"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchReportDetails, REPORT_DETAILS_QUERY_KEY } from "./report_details";

export function useReportDetails(reportId: string | null) {
  return useQuery({
    queryKey: [...REPORT_DETAILS_QUERY_KEY, reportId || ""],
    queryFn: () => (reportId ? fetchReportDetails(reportId) : Promise.resolve(undefined)),
    enabled: Boolean(reportId),
  });
}
