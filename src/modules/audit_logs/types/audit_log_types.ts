import { z } from "zod";
import {
  AuditLogRecordSchema,
} from "@/modules/shared/types/cirp_schema";

export const AuditLogListResponseSchema = z.array(AuditLogRecordSchema);
export type AuditLogListResponse = z.infer<typeof AuditLogListResponseSchema>;
