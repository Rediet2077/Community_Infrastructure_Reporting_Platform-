"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAssetTypeList, ASSET_TYPE_LIST_QUERY_KEY } from "./asset_type_list";

export function useAssetTypeList() {
  return useQuery({
    queryKey: ASSET_TYPE_LIST_QUERY_KEY,
    queryFn: fetchAssetTypeList,
  });
}
