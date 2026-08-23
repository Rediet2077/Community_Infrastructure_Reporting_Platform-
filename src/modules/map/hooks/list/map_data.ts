import { executeApiRequest } from "@/modules/shared/services/api_client";
import { mockDataStore } from "@/modules/shared/services/mock_storage";
import { z } from "zod";
import { AssetRecordSchema } from "@/modules/shared/types/cirp_schema";

export const MAP_DATA_QUERY_KEY = ["map", "data"] as const;

const MapDataResponseSchema = z.array(AssetRecordSchema);
export type MapDataResponse = z.infer<typeof MapDataResponseSchema>;

export async function fetchMapData(departmentId?: string): Promise<MapDataResponse> {
  return executeApiRequest({
    endpoint: "/map/assets",
    method: "GET",
    query: { department_id: departmentId },
    outputSchema: MapDataResponseSchema,
    mockFallback: () => mockDataStore.getAssets(departmentId),
  });
}
