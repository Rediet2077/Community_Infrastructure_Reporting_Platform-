"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchContractorList,
  CONTRACTOR_LIST_QUERY_KEY,
} from "./contractor_list";

export function useContractorList(departmentId?: string) {
  return useQuery({
    queryKey: [...CONTRACTOR_LIST_QUERY_KEY, departmentId || "all"],
    queryFn: () => fetchContractorList(departmentId),
  });
}
