import { executeApiRequest } from "@/modules/shared/services/api_client";
import { mockDataStore } from "@/modules/shared/services/mock_storage";
import { z } from "zod";
import { ReturnRejectTaskInput } from "../../types/task_types";

export async function returnRejectTask(input: ReturnRejectTaskInput): Promise<boolean> {
  return executeApiRequest({
    endpoint: `/tasks/${input.taskId}/return-reject`,
    method: "POST",
    body: input,
    outputSchema: z.boolean(),
    mockFallback: () => {
      return mockDataStore.returnOrRejectTask(input.taskId, {
        officerName: input.officerName,
        reason: input.reason,
        requiredCorrection: input.requiredCorrection,
        newExpectedDate: input.newExpectedDate,
      });
    },
  });
}
