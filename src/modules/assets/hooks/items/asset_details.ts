import { executeApiRequest } from "@/modules/shared/services/api_client";
import { mockDataStore } from "@/modules/shared/services/mock_storage";
import { AssetRecord, AssetRecordSchema } from "../../types/asset_types";

export const ASSET_DETAILS_QUERY_KEY = ["assets", "details"] as const;

export async function fetchAssetDetails(assetId: string): Promise<AssetRecord | undefined> {
  return executeApiRequest({
    endpoint: `/assets/${assetId}`,
    method: "GET",
    outputSchema: AssetRecordSchema,
    mockFallback: () => {
      const asset = mockDataStore.getAssetById(assetId);
      if (!asset) throw new Error("Asset not found");
      return asset;
    },
  });
}
