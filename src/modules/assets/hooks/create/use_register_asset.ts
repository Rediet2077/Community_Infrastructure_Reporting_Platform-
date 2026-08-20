"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerAsset } from "./register_asset";
import { ASSET_LIST_QUERY_KEY } from "../list/asset_list";
import { RegisterAssetInput, AssetRecord, AssetListResponse } from "../../types/asset_types";

export function useRegisterAsset() {
  const queryClient = useQueryClient();

  return useMutation<AssetRecord, Error, RegisterAssetInput, { previous: AssetListResponse | undefined }>({
    mutationFn: (input: RegisterAssetInput) => registerAsset(input),
    onMutate: async (newAsset) => {
      await queryClient.cancelQueries({ queryKey: ASSET_LIST_QUERY_KEY });
      const previous = queryClient.getQueryData<AssetListResponse>(ASSET_LIST_QUERY_KEY);
      const tempId = `temp-${Date.now()}`;
      const optimisticAsset: AssetRecord = {
        ...newAsset,
        id: tempId,
        registered_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        active_reports_count: 0,
      };
      queryClient.setQueryData<AssetListResponse>(ASSET_LIST_QUERY_KEY, (old) =>
        old ? [...old, optimisticAsset] : [optimisticAsset]
      );
      return { previous };
    },
    onError: (_err, _newAsset, ctx) => {
      if (ctx?.previous) queryClient.setQueryData<AssetListResponse>(ASSET_LIST_QUERY_KEY, ctx.previous);
    },
    onSuccess: (savedAsset) => {
      queryClient.setQueryData<AssetListResponse>(ASSET_LIST_QUERY_KEY, (old) =>
        old ? old.map((a) => (a.id.startsWith("temp-") ? savedAsset : a)) : [savedAsset]
      );
    },
  });
}