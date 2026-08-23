import { executeApiRequest } from "@/modules/shared/services/api_client";
import { mockDataStore } from "@/modules/shared/services/mock_storage";
import { z } from "zod";
import { LinkAssetInput } from "../../types/report_types";

export async function linkAssetToReport(input: LinkAssetInput): Promise<boolean> {
  return executeApiRequest({
    endpoint: `/reports/${input.reportId}/link-asset`,
    method: "POST",
    body: input,
    outputSchema: z.boolean(),
    mockFallback: () => mockDataStore.linkAssetToReport(input.reportId, input.assetId),
  });
}
