"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addContractor } from "./add_contractor";
import { CONTRACTOR_LIST_QUERY_KEY } from "../list/contractor_list";
import { CreateStaffContractorInput } from "../../types/contractor_types";

export function useAddContractor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateStaffContractorInput) => addContractor(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTRACTOR_LIST_QUERY_KEY });
    },
  });
}
