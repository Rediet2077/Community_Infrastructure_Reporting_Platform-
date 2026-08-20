import { z } from "zod";
import { DepartmentRecordSchema, DepartmentRecord } from "@/modules/shared/types/cirp_schema";

export type { DepartmentRecord };

export const DepartmentListResponseSchema = z.array(DepartmentRecordSchema);
export type DepartmentListResponse = z.infer<typeof DepartmentListResponseSchema>;
