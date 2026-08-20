import { z } from "zod";
import {
  StaffContractorRecordSchema,
  StaffContractorRecord,
} from "@/modules/shared/types/cirp_schema";

export { StaffContractorRecordSchema };
export type { StaffContractorRecord };

const CreateStaffContractorInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone_number: z.string().min(1, "Phone number is required"),
  email: z.string().email("Valid email required"),
  department_id: z.string(),
  department_name: z.string(),
  role_type: z.enum(["STAFF_OFFICER", "CONTRACTOR_LEAD", "FIELD_TECHNICIAN"]),
  position_title: z.string(),
  specialization: z.string(),
  is_contractor: z.boolean(),
  contractor_company_name: z.string().optional(),
  license_number: z.string().optional(),
  performance_score: z.number().default(95),
  is_available: z.boolean().default(true),
});
export type CreateStaffContractorInput = z.infer<typeof CreateStaffContractorInputSchema>;

export const ContractorListResponseSchema = z.array(StaffContractorRecordSchema);
export type ContractorListResponse = z.infer<typeof ContractorListResponseSchema>;
