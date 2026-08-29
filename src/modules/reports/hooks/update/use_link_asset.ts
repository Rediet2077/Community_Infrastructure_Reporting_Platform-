"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { linkAssetToReport } from "./link_asset";
import { REPORT_LIST_QUERY_KEY } from "../list/report_list";
import { LinkAssetInput } from "../../types/report_types";

export function useLinkAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: LinkAssetInput) => linkAssetToReport(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REPORT_LIST_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["assets", "list"] });
    },
  });
}
