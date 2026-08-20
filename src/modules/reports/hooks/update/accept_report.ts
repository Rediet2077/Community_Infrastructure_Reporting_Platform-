import { executeApiRequest } from "@/modules/shared/services/api_client";
import { mockDataStore } from "@/modules/shared/services/mock_storage";
import { TaskRecord, TaskRecordSchema } from "@/modules/shared/types/cirp_schema";
import { AcceptReportInput } from "../../types/report_types";

export async function acceptReport(input: AcceptReportInput): Promise<TaskRecord | null> {
  return executeApiRequest({
    endpoint: `/reports/${input.reportId}/accept`,
    method: "POST",
    body: input,
    outputSchema: TaskRecordSchema,
    mockFallback: () => {
      const task = mockDataStore.acceptReport(input.reportId, {
        priority: input.priority,
        assignedWorkerId: input.assignedWorkerId,
        deadlineDate: input.deadlineDate,
        workDescription: input.workDescription,
        internalNote: input.internalNote,
      });
      if (!task) throw new Error("Failed to accept report");
      return task;
    },
  });
}
