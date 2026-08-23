import { executeApiRequest } from "@/modules/shared/services/api_client";
import { mockDataStore } from "@/modules/shared/services/mock_storage";
import { z } from "zod";
import { VerifyResolveTaskInput } from "../../types/task_types";

export async function verifyResolveTask(input: VerifyResolveTaskInput): Promise<boolean> {
  return executeApiRequest({
    endpoint: `/tasks/${input.taskId}/verify-resolve`,
    method: "POST",
    body: input,
    outputSchema: z.boolean(),
    mockFallback: () => {
      return mockDataStore.verifyAndResolveTask(input.taskId, {
        officerName: input.officerName,
        resolutionNotes: input.resolutionNotes,
      });
    },
  });
}
