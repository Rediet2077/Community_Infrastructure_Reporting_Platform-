"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptReport } from "./accept_report";
import { REPORT_LIST_QUERY_KEY } from "../list/report_list";
import { AcceptReportInput } from "../../types/report_types";

export function useAcceptReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: AcceptReportInput) => acceptReport(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REPORT_LIST_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["tasks", "list"] });
      queryClient.invalidateQueries({ queryKey: ["audit_logs", "list"] });
    },
  });
}
