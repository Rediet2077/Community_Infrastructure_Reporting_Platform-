"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestExtension } from "./request_extension";
import { EXTENSION_LIST_QUERY_KEY } from "../list/extension_list";
import { RequestExtensionInput } from "../../types/extension_types";

export function useRequestExtension() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: RequestExtensionInput) => requestExtension(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXTENSION_LIST_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["tasks", "list"] });
      queryClient.invalidateQueries({ queryKey: ["audit_logs", "list"] });
    },
  });
}
