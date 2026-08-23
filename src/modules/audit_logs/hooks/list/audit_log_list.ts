import { executeApiRequest } from "@/modules/shared/services/api_client";
import { mockDataStore } from "@/modules/shared/services/mock_storage";
import {
  AuditLogListResponseSchema,
  AuditLogListResponse,
} from "../../types/audit_log_types";

export const AUDIT_LOG_LIST_QUERY_KEY = ["audit_logs", "list"] as const;

export async function fetchAuditLogList(): Promise<AuditLogListResponse> {
  return executeApiRequest({
    endpoint: "/audit-logs",
    method: "GET",
    outputSchema: AuditLogListResponseSchema,
    mockFallback: () => mockDataStore.getAuditLogs(),
  });
}
