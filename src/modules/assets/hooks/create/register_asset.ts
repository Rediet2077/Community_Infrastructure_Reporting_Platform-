import { executeApiRequest } from "@/modules/shared/services/api_client";
import { mockDataStore } from "@/modules/shared/services/mock_storage";
import {
  RegisterAssetInput,
  AssetRecord,
  AssetRecordSchema,
} from "../../types/asset_types";

export async function registerAsset(input: RegisterAssetInput): Promise<AssetRecord> {
  return executeApiRequest({
    endpoint: "/assets",
    method: "POST",
    body: input,
    outputSchema: AssetRecordSchema,
    mockFallback: () => mockDataStore.registerAsset(input),
  });
}
