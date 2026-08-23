import { executeApiRequest } from "@/modules/shared/services/api_client";
import { mockDataStore } from "@/modules/shared/services/mock_storage";
import { TaskRecord, TaskRecordSchema } from "../../types/task_types";

export const TASK_DETAILS_QUERY_KEY = ["tasks", "details"] as const;

export async function fetchTaskDetails(taskId: string): Promise<TaskRecord | undefined> {
  return executeApiRequest({
    endpoint: `/tasks/${taskId}`,
    method: "GET",
    outputSchema: TaskRecordSchema,
    mockFallback: () => {
      const task = mockDataStore.getTaskById(taskId);
      if (!task) throw new Error("Task not found");
      return task;
    },
  });
}
