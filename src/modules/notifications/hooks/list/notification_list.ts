import { executeApiRequest } from "@/modules/shared/services/api_client";
import {
  NotificationListResponseSchema,
  NotificationListResponse,
  NotificationRecord,
} from "../../types/notification_types";

export const NOTIFICATION_LIST_QUERY_KEY = ["notifications", "list"] as const;

const INITIAL_MOCK_NOTIFICATIONS: NotificationRecord[] = [
  {
    id: "notif-001",
    title: "Critical SLA Warning: Overdue Streetlight Repair",
    message: "Task TSK-SL-BOL-042-881 in Bole Medhanialem has exceeded the standard 24h safety SLA without completion.",
    category: "ESCALATION",
    priority: "CRITICAL",
    is_read: false,
    created_at: "12 mins ago",
    target_url: "/dashboard/deadlines",
    department_id: "dept-elec",
    department_name: "Electricity Department",
    entity_code: "TSK-SL-BOL-042-881",
  },
  {
    id: "notif-002",
    title: "New High-Priority Citizen Report Submitted",
    message: "Broken water main valve reported in Megenagna spraying potable water across pavement.",
    category: "NEW_REPORT",
    priority: "HIGH",
    is_read: false,
    created_at: "35 mins ago",
    target_url: "/dashboard/reports",
    department_id: "dept-water",
    department_name: "Water & Sanitation Department",
    entity_code: "REP-2026-0821",
  },
  {
    id: "notif-003",
    title: "Deadline Extension Requested by Contractor",
    message: "Abyssinia Civil Works requested a 4-day extension for CMC Road asphalt resurfacing due to rain.",
    category: "EXTENSION_REQUEST",
    priority: "MEDIUM",
    is_read: false,
    created_at: "1 hour ago",
    target_url: "/dashboard/extensions",
    department_id: "dept-roads",
    department_name: "Roads & Transport Department",
    entity_code: "EXT-001",
  },
  {
    id: "notif-004",
    title: "Task Resolved & Ready for Quality Audit",
    message: "Overflowing commercial dumpster in Piazza cleared and sanitized by sanitation team.",
    category: "TASK_COMPLETED",
    priority: "LOW",
    is_read: true,
    created_at: "3 hours ago",
    target_url: "/dashboard/reports",
    department_id: "dept-waste",
    department_name: "Sanitation & Waste Management",
    entity_code: "REP-2026-0823",
  },
  {
    id: "notif-005",
    title: "GIS Database Geocoding Sync Completed",
    message: "Nightly automated spatial index updated 14 newly registered municipal physical assets.",
    category: "SYSTEM_ALERT",
    priority: "LOW",
    is_read: true,
    created_at: "6 hours ago",
    target_url: "/dashboard/map",
    department_name: "Municipal GIS Core",
    entity_code: "SYNC-GIS-2026",
  },
];

export async function fetchNotificationList(departmentId?: string): Promise<NotificationListResponse> {
  return executeApiRequest({
    endpoint: "/notifications",
    method: "GET",
    query: { department_id: departmentId },
    outputSchema: NotificationListResponseSchema,
    mockFallback: () => {
      if (!departmentId || departmentId === "all") {
        return INITIAL_MOCK_NOTIFICATIONS;
      }
      return INITIAL_MOCK_NOTIFICATIONS.filter((n) => !n.department_id || n.department_id === departmentId);
    },
  });
}
