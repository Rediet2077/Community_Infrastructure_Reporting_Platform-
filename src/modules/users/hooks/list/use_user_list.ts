"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUserList, USER_LIST_QUERY_KEY } from "./user_list";

export function useUserList(departmentId?: string) {
  return useQuery({
    queryKey: [...USER_LIST_QUERY_KEY, departmentId || "all"],
    queryFn: () => fetchUserList(departmentId),
    staleTime: 1000 * 60 * 5,
  });
}
