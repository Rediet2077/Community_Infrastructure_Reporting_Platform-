import { executeApiRequest } from "@/modules/shared/services/api_client";
import { mockDataStore } from "@/modules/shared/services/mock_storage";
import { z } from "zod";
import { DecideExtensionInput } from "../../types/extension_types";

export async function decideExtension(input: DecideExtensionInput): Promise<boolean> {
  return executeApiRequest({
    endpoint: `/extensions/${input.extensionId}/decide`,
    method: "POST",
    body: input,
    outputSchema: z.boolean(),
    mockFallback: () => {
      return mockDataStore.decideExtension(input.extensionId, {
        approve: input.approve,
        decidedBy: input.decidedBy,
        decisionComment: input.decisionComment,
      });
    },
  });
}
