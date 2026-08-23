import { executeApiRequest } from "@/modules/shared/services/api_client";
import { mockDataStore } from "@/modules/shared/services/mock_storage";
import {
  UpdateTaskProgressInput,
  TaskRecord,
  TaskRecordSchema,
} from "../../types/task_types";

export async function updateTaskProgress(input: UpdateTaskProgressInput): Promise<TaskRecord | null> {
  return executeApiRequest({
    endpoint: `/tasks/${input.taskId}/progress`,
    method: "POST",
    body: input,
    outputSchema: TaskRecordSchema,
    mockFallback: () => {
      const updated = mockDataStore.updateTaskProgress(input.taskId, {
        progressPercentage: input.progressPercentage,
        newStatus: input.newStatus,
        progressNote: input.progressNote,
        authorName: input.authorName,
      });
      if (!updated) throw new Error("Task not found");
      return updated;
    },
  });
}
