"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { returnRejectTask } from "./return_reject_task";
import { TASK_LIST_QUERY_KEY } from "../list/task_list";
import { ReturnRejectTaskInput } from "../../types/task_types";

export function useReturnRejectTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: ReturnRejectTaskInput) => returnRejectTask(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASK_LIST_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["reports", "list"] });
      queryClient.invalidateQueries({ queryKey: ["audit_logs", "list"] });
    },
  });
}
