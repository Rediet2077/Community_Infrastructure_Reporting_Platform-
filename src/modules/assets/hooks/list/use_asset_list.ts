"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAssetList, ASSET_LIST_QUERY_KEY } from "./asset_list";

export function useAssetList(departmentId?: string, query?: string) {
  return useQuery({
    queryKey: [...ASSET_LIST_QUERY_KEY, departmentId || "all", query || ""],
    queryFn: () => fetchAssetList(departmentId, query),
  });
}
