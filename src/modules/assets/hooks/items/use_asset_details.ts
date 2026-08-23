"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAssetDetails, ASSET_DETAILS_QUERY_KEY } from "./asset_details";

export function useAssetDetails(assetId: string | null) {
  return useQuery({
    queryKey: [...ASSET_DETAILS_QUERY_KEY, assetId || ""],
    queryFn: () => (assetId ? fetchAssetDetails(assetId) : Promise.resolve(undefined)),
    enabled: Boolean(assetId),
  });
}
