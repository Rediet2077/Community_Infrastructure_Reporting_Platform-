import { executeApiRequest } from "@/modules/shared/services/api_client";
import { mockDataStore } from "@/modules/shared/services/mock_storage";
import {
  RequestExtensionInput,
  ExtensionRecord,
  ExtensionRecordSchema,
} from "../../types/extension_types";

export async function requestExtension(input: RequestExtensionInput): Promise<ExtensionRecord | null> {
  return executeApiRequest({
    endpoint: `/extensions`,
    method: "POST",
    body: input,
    outputSchema: ExtensionRecordSchema,
    mockFallback: () => {
      const ext = mockDataStore.requestDeadlineExtension(input.taskId, {
        requestedNewDeadline: input.requestedNewDeadline,
        reasonCategory: input.reasonCategory,
        detailedExplanation: input.detailedExplanation,
        supportingEvidenceNote: input.supportingEvidenceNote,
        requestedBy: input.requestedBy,
      });
      if (!ext) throw new Error("Task not found");
      return ext;
    },
  });
}
