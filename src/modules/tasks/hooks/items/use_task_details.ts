"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTaskDetails, TASK_DETAILS_QUERY_KEY } from "./task_details";

export function useTaskDetails(taskId: string | null) {
  return useQuery({
    queryKey: [...TASK_DETAILS_QUERY_KEY, taskId || ""],
    queryFn: () => (taskId ? fetchTaskDetails(taskId) : Promise.resolve(undefined)),
    enabled: Boolean(taskId),
  });
}
