import { z } from "zod";
import {
  ReportRecordSchema,
  ReportRecord,
} from "@/modules/shared/types/cirp_schema";

export { ReportRecordSchema };
export type { ReportRecord };

export const ReportListResponseSchema = z.array(ReportRecordSchema);
export type ReportListResponse = z.infer<typeof ReportListResponseSchema>;

const AcceptReportInputSchema = z.object({
  reportId: z.string(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
  assignedWorkerId: z.string().min(1, "Assignee is required"),
  deadlineDate: z.string().min(1, "Deadline date is required"),
  workDescription: z.string().min(1, "Work description is required"),
  internalNote: z.string().default(""),
});
export type AcceptReportInput = z.infer<typeof AcceptReportInputSchema>;

const LinkAssetInputSchema = z.object({
  reportId: z.string(),
  assetId: z.string(),
});
export type LinkAssetInput = z.infer<typeof LinkAssetInputSchema>;
