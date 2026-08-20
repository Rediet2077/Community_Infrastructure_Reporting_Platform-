"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchReportList, REPORT_LIST_QUERY_KEY } from "./report_list";

export function useReportList(departmentId?: string, query?: string) {
  return useQuery({
    queryKey: [...REPORT_LIST_QUERY_KEY, departmentId || "all", query || ""],
    queryFn: () => fetchReportList(departmentId, query),
  });
}
