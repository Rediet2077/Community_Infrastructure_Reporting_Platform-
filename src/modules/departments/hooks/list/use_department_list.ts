"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchDepartmentList,
  DEPARTMENT_LIST_QUERY_KEY,
} from "./department_list";

export function useDepartmentList() {
  return useQuery({
    queryKey: DEPARTMENT_LIST_QUERY_KEY,
    queryFn: fetchDepartmentList,
  });
}
