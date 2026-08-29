"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchExtensionList, EXTENSION_LIST_QUERY_KEY } from "./extension_list";

export function useExtensionList(departmentId?: string) {
  return useQuery({
    queryKey: [...EXTENSION_LIST_QUERY_KEY, departmentId || "all"],
    queryFn: () => fetchExtensionList(departmentId),
  });
}
