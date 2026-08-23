import { executeApiRequest } from "@/modules/shared/services/api_client";
import { mockDataStore } from "@/modules/shared/services/mock_storage";
import {
  SubmitTaskCompletionInput,
  TaskRecord,
  TaskRecordSchema,
} from "../../types/task_types";

export async function submitTaskCompletion(input: SubmitTaskCompletionInput): Promise<TaskRecord | null> {
  return executeApiRequest({
    endpoint: `/tasks/${input.taskId}/complete`,
    method: "POST",
    body: input,
    outputSchema: TaskRecordSchema,
    mockFallback: () => {
      const updated = mockDataStore.submitTaskCompletion(input.taskId, {
        completionNotes: input.completionNotes,
        completionDate: input.completionDate,
        beforePhotos: input.beforePhotos,
        afterPhotos: input.afterPhotos,
        submittedBy: input.submittedBy,
      });
      if (!updated) throw new Error("Task not found");
      return updated;
    },
  });
}
