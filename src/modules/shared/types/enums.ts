export type AssetTypeKey =
  | "street_light"
  | "road"
  | "water_point"
  | "drainage"
  | "waste_bin"
  | "public_building";

export type AssetStatus = "ACTIVE" | "INACTIVE";

export type AssetCondition = "EXCELLENT" | "GOOD" | "FAIR" | "POOR" | "CRITICAL";

export type ReportPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type UserRole = "SYSTEM_ADMIN" | "DEPARTMENT_ADMIN";

type DepartmentStatus = "PENDING" | "ACTIVE" | "INACTIVE";

export type AdminNavigationTab =
  | "dashboard"
  | "all_assets"
  | "register_asset"
  | "asset_types"
  | "reports"
  | "report_details"
  | "tasks"
  | "deadlines"
  | "extensions"
  | "map"
  | "departments"
  | "department_profile"
  | "contractors"
  | "analytics"
  | "audit_logs";
