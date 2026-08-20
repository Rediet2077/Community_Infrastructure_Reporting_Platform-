import { z } from "zod";
import { RequestExtensionInput } from "./extension_types";

export const requestExtensionSchema = z.object({
  taskId: z.string(),
  requestedNewDeadline: z.string().min(1, "Deadline is required"),
  reasonCategory: z.enum([
    "Waiting for spare parts",
    "Severe weather / Environmental condition",
    "Specialized equipment delivery delay",
    "Access / Obstruction clearance required",
    "Additional technician crew needed"
  ]),
  detailedExplanation: z.string().min(10, "Provide a more detailed technical justification (min 10 characters)"),
  supportingEvidenceNote: z.string().optional(),
  requestedBy: z.string().min(1, "Requestor name is required"),
});

export type RequestExtensionFormData = z.infer<typeof requestExtensionSchema>;
