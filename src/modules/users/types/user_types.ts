import { z } from "zod";

const UserRoleSchema = z.enum(["SYSTEM_ADMIN", "DEPARTMENT_ADMIN"]);
export type SystemUserRole = z.infer<typeof UserRoleSchema>;

const UserStatusSchema = z.enum(["ACTIVE", "INACTIVE", "PENDING"]);

const DepartmentRefSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
});

export const UserRecordSchema = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  role: UserRoleSchema,
  status: UserStatusSchema,
  department: DepartmentRefSchema.nullable(),
});
export type UserRecord = z.infer<typeof UserRecordSchema>;

export const UserListResponseSchema = z.array(UserRecordSchema);
export type UserListResponse = z.infer<typeof UserListResponseSchema>;
