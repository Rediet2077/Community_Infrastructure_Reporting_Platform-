import { z } from "zod";

export const addContractorSchema = z.object({
  is_contractor: z.boolean(),
  department_id: z.string().min(1, "Department is required"),
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(6, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  position_title: z.string().min(2, "Position title is required"),
  contractor_company_name: z.string().optional(),
  license_number: z.string().optional(),
  specialization: z.string().min(2, "Specialization is required"),
}).superRefine((data, ctx) => {
  if (data.is_contractor) {
    if (!data.contractor_company_name) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Company name is required for external contractors",
        path: ["contractor_company_name"],
      });
    }
    if (!data.license_number) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "License number is required for external contractors",
        path: ["license_number"],
      });
    }
  }
});

export type AddContractorFormData = z.infer<typeof addContractorSchema>;
