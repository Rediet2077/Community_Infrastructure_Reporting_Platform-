"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verifyResolveTask } from "./verify_resolve_task";
import { TASK_LIST_QUERY_KEY } from "../list/task_list";
import { VerifyResolveTaskInput } from "../../types/task_types";

export function useVerifyResolveTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: VerifyResolveTaskInput) => verifyResolveTask(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASK_LIST_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["reports", "list"] });
      queryClient.invalidateQueries({ queryKey: ["assets", "list"] });
      queryClient.invalidateQueries({ queryKey: ["audit_logs", "list"] });
    },
  });
}
