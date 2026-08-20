"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { decideExtension } from "./decide_extension";
import { EXTENSION_LIST_QUERY_KEY } from "../list/extension_list";
import { DecideExtensionInput } from "../../types/extension_types";

export function useDecideExtension() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: DecideExtensionInput) => decideExtension(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXTENSION_LIST_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["tasks", "list"] });
      queryClient.invalidateQueries({ queryKey: ["audit_logs", "list"] });
    },
  });
}
