import { executeApiRequest } from "@/modules/shared/services/api_client";
import { mockDataStore } from "@/modules/shared/services/mock_storage";
import {
  ContractorListResponseSchema,
  ContractorListResponse,
} from "../../types/contractor_types";

export const CONTRACTOR_LIST_QUERY_KEY = ["contractors", "list"] as const;

export async function fetchContractorList(departmentId?: string): Promise<ContractorListResponse> {
  return executeApiRequest({
    endpoint: "/contractors",
    method: "GET",
    query: { department_id: departmentId },
    outputSchema: ContractorListResponseSchema,
    mockFallback: () => mockDataStore.getStaffContractors(departmentId),
  });
}
