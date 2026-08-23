"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTaskProgress } from "./update_task_progress";
import { TASK_LIST_QUERY_KEY } from "../list/task_list";
import { UpdateTaskProgressInput } from "../../types/task_types";

export function useUpdateTaskProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateTaskProgressInput) => updateTaskProgress(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASK_LIST_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["reports", "list"] });
      queryClient.invalidateQueries({ queryKey: ["audit_logs", "list"] });
    },
  });
}
