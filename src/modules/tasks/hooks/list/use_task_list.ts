"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTaskList, TASK_LIST_QUERY_KEY } from "./task_list";

export function useTaskList(departmentId?: string, query?: string) {
  return useQuery({
    queryKey: [...TASK_LIST_QUERY_KEY, departmentId || "all", query || ""],
    queryFn: () => fetchTaskList(departmentId, query),
  });
}
