import { executeApiRequest } from "@/modules/shared/services/api_client";
import { mockDataStore } from "@/modules/shared/services/mock_storage";
import {
  AssetListResponseSchema,
  AssetListResponse,
} from "../../types/asset_types";

export const ASSET_LIST_QUERY_KEY = ["assets", "list"] as const;

export async function fetchAssetList(departmentId?: string, query?: string): Promise<AssetListResponse> {
  return executeApiRequest({
    endpoint: "/assets",
    method: "GET",
    query: { department_id: departmentId, search: query },
    outputSchema: AssetListResponseSchema,
    mockFallback: () => mockDataStore.getAssets(departmentId, query),
  });
}
