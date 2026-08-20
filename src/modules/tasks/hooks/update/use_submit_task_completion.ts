"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitTaskCompletion } from "./submit_task_completion";
import { TASK_LIST_QUERY_KEY } from "../list/task_list";
import { SubmitTaskCompletionInput } from "../../types/task_types";

export function useSubmitTaskCompletion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: SubmitTaskCompletionInput) => submitTaskCompletion(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASK_LIST_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["reports", "list"] });
      queryClient.invalidateQueries({ queryKey: ["audit_logs", "list"] });
    },
  });
}
