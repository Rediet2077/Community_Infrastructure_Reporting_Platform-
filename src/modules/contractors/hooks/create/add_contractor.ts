import { executeApiRequest } from "@/modules/shared/services/api_client";
import { mockDataStore } from "@/modules/shared/services/mock_storage";
import {
  CreateStaffContractorInput,
  StaffContractorRecord,
  StaffContractorRecordSchema,
} from "../../types/contractor_types";

export async function addContractor(
  input: CreateStaffContractorInput
): Promise<StaffContractorRecord> {
  return executeApiRequest({
    endpoint: "/contractors",
    method: "POST",
    body: input,
    outputSchema: StaffContractorRecordSchema,
    mockFallback: () => mockDataStore.addStaffContractor(input),
  });
}
