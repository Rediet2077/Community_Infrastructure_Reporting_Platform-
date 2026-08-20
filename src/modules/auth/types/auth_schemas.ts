import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid official email address."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  department_name: z.string().min(2, "Department name is required"),
  department_code: z.string().min(2, "Department code is required"),
  department_email: z.string().email("Please enter a valid department email"),
  department_phone: z.string().min(8, "Department phone number is required"),
  address: z.string().min(2, "Office address is required"),
  representative_first_name: z.string().min(2, "First name is required"),
  representative_last_name: z.string().min(2, "Last name is required"),
  representative_email: z.string().email("Please enter a valid email address"),
  representative_phone: z.string().min(8, "Representative phone is required"),
  password: z.string().min(8, "Password must be at least 8 characters long."),
  confirm_password: z.string(),
  agree_terms: z.literal(true),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords do not match.",
  path: ["confirm_password"],
});

export type SignupFormData = z.infer<typeof signupSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid official email address."),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
