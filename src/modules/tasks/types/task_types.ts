import { z } from "zod";
import {
  TaskRecordSchema,
  TaskRecord,
} from "@/modules/shared/types/cirp_schema";

export { TaskRecordSchema };
export type { TaskRecord };

export const TaskListResponseSchema = z.array(TaskRecordSchema);
export type TaskListResponse = z.infer<typeof TaskListResponseSchema>;

const UpdateTaskProgressInputSchema = z.object({
  taskId: z.string(),
  progressPercentage: z.number().min(0).max(100),
  newStatus: z.enum([
    "ASSIGNED",
    "IN_PROGRESS",
    "COMPLETED_PENDING_VERIFICATION",
    "RESOLVED",
    "RETURNED",
  ]),
  progressNote: z.string().min(1, "Progress note is required"),
  authorName: z.string().min(1, "Author name is required"),
});
export type UpdateTaskProgressInput = z.infer<typeof UpdateTaskProgressInputSchema>;

const SubmitTaskCompletionInputSchema = z.object({
  taskId: z.string(),
  completionNotes: z.string().min(1, "Completion notes required"),
  completionDate: z.string().min(1, "Completion date required"),
  beforePhotos: z.array(z.string()).default([]),
  afterPhotos: z.array(z.string()).default([]),
  submittedBy: z.string().min(1, "Submitted by required"),
});
export type SubmitTaskCompletionInput = z.infer<typeof SubmitTaskCompletionInputSchema>;

const VerifyResolveTaskInputSchema = z.object({
  taskId: z.string(),
  officerName: z.string().min(1, "Officer name required"),
  resolutionNotes: z.string().min(1, "Resolution verification notes required"),
});
export type VerifyResolveTaskInput = z.infer<typeof VerifyResolveTaskInputSchema>;

const ReturnRejectTaskInputSchema = z.object({
  taskId: z.string(),
  officerName: z.string().min(1, "Officer name required"),
  reason: z.string().min(1, "Rejection reason required"),
  requiredCorrection: z.string().min(1, "Correction required"),
  newExpectedDate: z.string().min(1, "New expected date required"),
});
export type ReturnRejectTaskInput = z.infer<typeof ReturnRejectTaskInputSchema>;
