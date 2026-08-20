import { executeApiRequest } from "@/modules/shared/services/api_client";
import { mockDataStore } from "@/modules/shared/services/mock_storage";
import {
  ExtensionListResponseSchema,
  ExtensionListResponse,
} from "../../types/extension_types";

export const EXTENSION_LIST_QUERY_KEY = ["extensions", "list"] as const;

export async function fetchExtensionList(departmentId?: string): Promise<ExtensionListResponse> {
  return executeApiRequest({
    endpoint: "/extensions",
    method: "GET",
    query: { department_id: departmentId },
    outputSchema: ExtensionListResponseSchema,
    mockFallback: () => mockDataStore.getExtensions(departmentId),
  });
}
