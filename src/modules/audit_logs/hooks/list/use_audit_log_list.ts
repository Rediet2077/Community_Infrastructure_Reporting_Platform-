"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAuditLogList, AUDIT_LOG_LIST_QUERY_KEY } from "./audit_log_list";

export function useAuditLogList() {
  return useQuery({
    queryKey: AUDIT_LOG_LIST_QUERY_KEY,
    queryFn: fetchAuditLogList,
  });
}
