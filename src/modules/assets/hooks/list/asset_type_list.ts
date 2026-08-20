import { executeApiRequest } from "@/modules/shared/services/api_client";
import { mockDataStore } from "@/modules/shared/services/mock_storage";
import {
  AssetTypeListResponseSchema,
  AssetTypeListResponse,
} from "../../types/asset_types";

export const ASSET_TYPE_LIST_QUERY_KEY = ["assets", "types"] as const;

export async function fetchAssetTypeList(): Promise<AssetTypeListResponse> {
  return executeApiRequest({
    endpoint: "/asset-types",
    method: "GET",
    outputSchema: AssetTypeListResponseSchema,
    mockFallback: () => mockDataStore.getAssetTypes(),
  });
}
