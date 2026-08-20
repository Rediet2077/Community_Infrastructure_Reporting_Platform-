import { z } from "zod";

const NotificationPrioritySchema = z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]);
type NotificationPriority = z.infer<typeof NotificationPrioritySchema>;

const NotificationCategorySchema = z.enum([
  "ESCALATION",
  "NEW_REPORT",
  "TASK_COMPLETED",
  "EXTENSION_REQUEST",
  "SYSTEM_ALERT",
]);
export type NotificationCategory = z.infer<typeof NotificationCategorySchema>;

const NotificationRecordSchema = z.object({
  id: z.string(),
  title: z.string(),
  message: z.string(),
  category: NotificationCategorySchema,
  priority: NotificationPrioritySchema,
  is_read: z.boolean(),
  created_at: z.string(),
  target_url: z.string().optional(),
  department_id: z.string().optional(),
  department_name: z.string().optional(),
  entity_code: z.string().optional(),
});
export type NotificationRecord = z.infer<typeof NotificationRecordSchema>;

export const NotificationListResponseSchema = z.array(NotificationRecordSchema);
export type NotificationListResponse = z.infer<typeof NotificationListResponseSchema>;
