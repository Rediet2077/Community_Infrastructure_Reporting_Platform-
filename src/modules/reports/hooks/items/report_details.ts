import { executeApiRequest } from "@/modules/shared/services/api_client";
import { mockDataStore } from "@/modules/shared/services/mock_storage";
import { ReportRecord, ReportRecordSchema } from "../../types/report_types";

export const REPORT_DETAILS_QUERY_KEY = ["reports", "details"] as const;

export async function fetchReportDetails(reportId: string): Promise<ReportRecord | undefined> {
  return executeApiRequest({
    endpoint: `/reports/${reportId}`,
    method: "GET",
    outputSchema: ReportRecordSchema,
    mockFallback: () => {
      const rep = mockDataStore.getReportById(reportId);
      if (!rep) throw new Error("Report not found");
      return rep;
    },
  });
}
