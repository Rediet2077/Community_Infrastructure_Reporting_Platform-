import { z } from "zod";

const SystemSettingsSchema = z.object({
  platform_name: z.string(),
  city_name: z.string(),
  emergency_escalation_hours: z.number(),
  high_priority_sla_hours: z.number(),
  medium_priority_sla_days: z.number(),
  low_priority_sla_days: z.number(),
  auto_dispatch_ai: z.boolean(),
  sms_citizen_updates: z.boolean(),
  email_department_digests: z.boolean(),
  gis_auto_clustering: z.boolean(),
  geofence_enforcement: z.boolean(),
});

export type SystemSettings = z.infer<typeof SystemSettingsSchema>;
