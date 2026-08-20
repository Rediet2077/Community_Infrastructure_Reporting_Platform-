"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotificationList, NOTIFICATION_LIST_QUERY_KEY } from "./notification_list";

export function useNotificationList(departmentId?: string) {
  return useQuery({
    queryKey: [...NOTIFICATION_LIST_QUERY_KEY, departmentId || "all"],
    queryFn: () => fetchNotificationList(departmentId),
    staleTime: 1000 * 60 * 2,
  });
}
