import { z } from "zod";
import {
  ExtensionRecordSchema,
  ExtensionRecord,
} from "@/modules/shared/types/cirp_schema";

export { ExtensionRecordSchema };
export type { ExtensionRecord };

export const ExtensionListResponseSchema = z.array(ExtensionRecordSchema);
export type ExtensionListResponse = z.infer<typeof ExtensionListResponseSchema>;

const RequestExtensionInputSchema = z.object({
  taskId: z.string(),
  requestedNewDeadline: z.string().min(1, "New deadline date required"),
  reasonCategory: z.enum([
    "Waiting for spare parts",
    "Severe weather / Environmental condition",
    "Specialized equipment delivery delay",
    "Access / Obstruction clearance required",
    "Additional technician crew needed",
  ]),
  detailedExplanation: z.string().min(1, "Detailed explanation required"),
  supportingEvidenceNote: z.string().default(""),
  requestedBy: z.string().min(1, "Requested by required"),
});
export type RequestExtensionInput = z.infer<typeof RequestExtensionInputSchema>;

const DecideExtensionInputSchema = z.object({
  extensionId: z.string(),
  approve: z.boolean(),
  decidedBy: z.string().min(1, "Decided by required"),
  decisionComment: z.string().optional(),
});
export type DecideExtensionInput = z.infer<typeof DecideExtensionInputSchema>;
