import { z } from "zod";
import { UserRecordSchema } from "@/modules/users/types/user_types";

const LoginInputSchema = z.object({
  email: z.string().email("Please enter a valid official email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export type LoginInput = z.infer<typeof LoginInputSchema>;

export const LoginResponseSchema = z.object({
  access: z.string(),
  refresh: z.string(),
  user: UserRecordSchema,
});
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

const SignupInputSchema = z.object({
  department_name: z.string().min(2, "Department name is required"),
  department_code: z.string().min(2, "Department code is required"),
  department_email: z.string().email("Please enter a valid department email"),
  department_phone: z.string().min(8, "Department phone is required"),
  address: z.string().min(2, "Address is required"),
  representative_first_name: z.string().min(2, "First name is required"),
  representative_last_name: z.string().min(2, "Last name is required"),
  representative_email: z.string().email("Please enter a valid email address"),
  representative_phone: z.string().min(8, "Representative phone is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
export type SignupInput = z.infer<typeof SignupInputSchema>;

export const SignupResponseSchema = z.object({
  message: z.string(),
});
export type SignupResponse = z.infer<typeof SignupResponseSchema>;

export interface DemoAccountPreset {
  title: string;
  name: string;
  email: string;
  role: "SYSTEM_ADMIN" | "DEPARTMENT_ADMIN";
  department_name: string;
  department_code: string;
}

export const DEMO_PRESETS: DemoAccountPreset[] = [
  {
    title: "City Admin",
    name: "Eng. Dawit Tadesse",
    email: "dawit.tadesse@cirp.gov.et",
    role: "SYSTEM_ADMIN",
    department_name: "Central Municipal Operations",
    department_code: "CENT",
  },
  {
    title: "Roads Department Admin",
    name: "Eng. Berhanu Wolde",
    email: "berhanu.wolde@cirp.gov.et",
    role: "DEPARTMENT_ADMIN",
    department_name: "Roads & Transport Department",
    department_code: "ROAD",
  },
];
