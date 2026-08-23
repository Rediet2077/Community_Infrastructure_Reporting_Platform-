import { z } from "zod";

const StreetLightSpecsSchema = z.object({
  pole_type: z.enum(["Concrete", "Steel", "Wooden", "Composite"]),
  light_type: z.enum(["LED", "High-Pressure Sodium", "Solar LED", "Halogen"]),
  power_source: z.enum(["Grid", "Solar", "Hybrid"]),
  height_meters: z.number(),
  wattage_watts: z.number(),
});
type StreetLightSpecs = z.infer<typeof StreetLightSpecsSchema>;

const RoadSpecsSchema = z.object({
  road_name: z.string(),
  road_type: z.enum(["Arterial Highway", "Collector Road", "Local Street", "Avenue"]),
  surface_type: z.enum(["Asphalt", "Cobblestone", "Gravel", "Concrete Paved"]),
  length_km: z.number(),
  width_meters: z.number(),
  lanes_count: z.number(),
});
type RoadSpecs = z.infer<typeof RoadSpecsSchema>;

const WaterPointSpecsSchema = z.object({
  pipe_type: z.enum(["Distribution Main", "Service Pipe", "Public Kiosk", "Fire Hydrant"]),
  pipe_diameter_mm: z.number(),
  material: z.enum(["HDPE", "Ductile Iron", "PVC", "Cast Iron"]),
  flow_capacity_lps: z.number(),
  supply_source: z.enum(["Municipal Reservoir", "Deep Well", "Treatment Plant"]),
});
type WaterPointSpecs = z.infer<typeof WaterPointSpecsSchema>;

const DrainageSpecsSchema = z.object({
  drain_type: z.enum(["Open Concrete Canal", "Underground Culvert", "Storm Sewer", "Side Gutter"]),
  width_meters: z.number(),
  depth_meters: z.number(),
  flow_direction: z.enum(["North-South", "East-West", "Towards River Basin"]),
  has_safety_grate: z.boolean(),
});
type DrainageSpecs = z.infer<typeof DrainageSpecsSchema>;

const WasteBinSpecsSchema = z.object({
  bin_type: z.enum(["Large Dumpster", "Recycling Station", "Solar Compactor", "Pedestrian Litter Bin"]),
  capacity_liters: z.number(),
  collection_frequency: z.enum(["Daily", "Twice Weekly", "Weekly"]),
  fill_level_sensor_id: z.string().optional(),
});
type WasteBinSpecs = z.infer<typeof WasteBinSpecsSchema>;

const PublicBuildingSpecsSchema = z.object({
  building_name: z.string(),
  building_type: z.enum(["Administrative Office", "Health Center", "Community Hall", "Public School", "Fire Station"]),
  floors_count: z.number(),
  construction_year: z.number(),
  has_emergency_shelter: z.boolean(),
});
type PublicBuildingSpecs = z.infer<typeof PublicBuildingSpecsSchema>;

const AssetSpecificDataSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("street_light"), specs: StreetLightSpecsSchema }),
  z.object({ type: z.literal("road"), specs: RoadSpecsSchema }),
  z.object({ type: z.literal("water_point"), specs: WaterPointSpecsSchema }),
  z.object({ type: z.literal("drainage"), specs: DrainageSpecsSchema }),
  z.object({ type: z.literal("waste_bin"), specs: WasteBinSpecsSchema }),
  z.object({ type: z.literal("public_building"), specs: PublicBuildingSpecsSchema }),
]);
export type AssetSpecificData = z.infer<typeof AssetSpecificDataSchema>;

export const AssetRecordSchema = z.object({
  id: z.string(),
  asset_code: z.string(),
  asset_type_id: z.enum([
    "street_light",
    "road",
    "water_point",
    "drainage",
    "waste_bin",
    "public_building",
  ]),
  asset_type_label: z.string(),
  department_id: z.string(),
  department_name: z.string(),
  name: z.string(),
  description: z.string(),
  status: z.enum(["ACTIVE", "UNDER_MAINTENANCE", "DAMAGED", "INACTIVE", "DECOMMISSIONED"]),
  condition: z.enum(["EXCELLENT", "GOOD", "FAIR", "POOR", "CRITICAL"]),
  installation_date: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  address: z.string(),
  landmark: z.string(),
  registered_by: z.string(),
  registered_at: z.string(),
  updated_at: z.string(),
  last_inspection_date: z.string(),
  active_reports_count: z.number(),
  specific_data: AssetSpecificDataSchema,
});
export type AssetRecord = z.infer<typeof AssetRecordSchema>;

export const AssetTypeDefinitionSchema = z.object({
  id: z.enum([
    "street_light",
    "road",
    "water_point",
    "drainage",
    "waste_bin",
    "public_building",
  ]),
  name: z.string(),
  description: z.string(),
  category_id: z.string(),
  responsible_department_id: z.string(),
  responsible_department_name: z.string(),
  requires_location: z.boolean(),
  is_active: z.boolean(),
  total_assets_count: z.number(),
});
export type AssetTypeDefinition = z.infer<typeof AssetTypeDefinitionSchema>;

export const ReportRecordSchema = z.object({
  id: z.string(),
  report_code: z.string(),
  title: z.string(),
  description: z.string(),
  category_name: z.string(),
  asset_id: z.string().nullable(),
  asset_code: z.string().nullable(),
  asset_type_label: z.string().nullable(),
  department_id: z.string(),
  department_name: z.string(),
  citizen_name: z.string(),
  citizen_contact: z.string(),
  citizen_latitude: z.number(),
  citizen_longitude: z.number(),
  address: z.string(),
  landmark: z.string(),
  status: z.enum([
    "NEW",
    "ACCEPTED",
    "IN_PROGRESS",
    "COMPLETED_PENDING_VERIFICATION",
    "RESOLVED",
    "DISPUTED",
  ]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
  submitted_at: z.string(),
  media_photos: z.array(z.string()),
  ai_category_prediction: z
    .object({
      suggested_category: z.string(),
      confidence: z.number(),
    })
    .optional(),
  ai_duplicate_analysis: z
    .object({
      has_potential_duplicate: z.boolean(),
      duplicate_report_code: z.string().optional(),
      similarity_score: z.number().optional(),
    })
    .optional(),
  suggested_nearby_assets: z
    .array(
      z.object({
        asset_id: z.string(),
        asset_code: z.string(),
        asset_name: z.string(),
        distance_meters: z.number(),
        asset_type: z.string(),
      })
    )
    .optional(),
  linked_task_id: z.string().nullable(),
  public_delay_explanation: z.string().optional(),
  resolution_notes: z.string().optional(),
  resolved_at: z.string().optional(),
});
export type ReportRecord = z.infer<typeof ReportRecordSchema>;

export const ExtensionRecordSchema = z.object({
  id: z.string(),
  task_id: z.string(),
  task_code: z.string(),
  report_code: z.string(),
  asset_code: z.string(),
  department_id: z.string(),
  original_deadline: z.string(),
  requested_new_deadline: z.string(),
  reason_category: z.enum([
    "Waiting for spare parts",
    "Severe weather / Environmental condition",
    "Specialized equipment delivery delay",
    "Access / Obstruction clearance required",
    "Additional technician crew needed",
  ]),
  detailed_explanation: z.string(),
  supporting_evidence_note: z.string(),
  requested_by: z.string(),
  requested_at: z.string(),
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
  decision_date: z.string().optional(),
  decided_by: z.string().optional(),
  decision_comment: z.string().optional(),
});
export type ExtensionRecord = z.infer<typeof ExtensionRecordSchema>;

export const TaskRecordSchema = z.object({
  id: z.string(),
  task_code: z.string(),
  report_id: z.string(),
  report_code: z.string(),
  asset_id: z.string(),
  asset_code: z.string(),
  asset_type_label: z.string(),
  department_id: z.string(),
  department_name: z.string(),
  assigned_worker_id: z.string(),
  assigned_worker_name: z.string(),
  is_contractor: z.boolean(),
  contractor_company: z.string().optional(),
  work_description: z.string(),
  internal_note: z.string(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
  status: z.enum([
    "ASSIGNED",
    "IN_PROGRESS",
    "COMPLETED_PENDING_VERIFICATION",
    "RESOLVED",
    "RETURNED",
  ]),
  progress_percentage: z.number(),
  created_at: z.string(),
  deadline_date: z.string(),
  original_deadline_date: z.string(),
  is_overdue: z.boolean(),
  days_overdue: z.number(),
  progress_notes: z.array(
    z.object({
      timestamp: z.string(),
      author: z.string(),
      note: z.string(),
      percentage: z.number(),
    })
  ),
  completion_submission: z
    .object({
      completion_date: z.string(),
      completion_notes: z.string(),
      before_photos: z.array(z.string()),
      after_photos: z.array(z.string()),
      submitted_by: z.string(),
    })
    .optional(),
  rejection_history: z
    .array(
      z.object({
        timestamp: z.string(),
        rejected_by: z.string(),
        reason: z.string(),
        required_correction: z.string(),
        new_expected_date: z.string(),
      })
    )
    .optional(),
  extensions: z.array(ExtensionRecordSchema),
});
export type TaskRecord = z.infer<typeof TaskRecordSchema>;

export const DepartmentRecordSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  description: z.string(),
  contact_email: z.string(),
  contact_phone: z.string(),
  office_location: z.string(),
  responsible_asset_types: z.array(
    z.enum([
      "street_light",
      "road",
      "water_point",
      "drainage",
      "waste_bin",
      "public_building",
    ])
  ),
  total_assets: z.number(),
  active_reports: z.number(),
  active_tasks: z.number(),
  overdue_tasks: z.number(),
  resolved_reports: z.number(),
  resolution_rate_percent: z.number(),
  avg_acceptance_hours: z.number(),
  avg_completion_days: z.number(),
});
export type DepartmentRecord = z.infer<typeof DepartmentRecordSchema>;

export const StaffContractorRecordSchema = z.object({
  id: z.string(),
  name: z.string(),
  phone_number: z.string(),
  email: z.string(),
  department_id: z.string(),
  department_name: z.string(),
  role_type: z.enum(["STAFF_OFFICER", "CONTRACTOR_LEAD", "FIELD_TECHNICIAN"]),
  position_title: z.string(),
  specialization: z.string(),
  is_contractor: z.boolean(),
  contractor_company_name: z.string().optional(),
  license_number: z.string().optional(),
  active_tasks_count: z.number(),
  completed_tasks_count: z.number(),
  overdue_tasks_count: z.number(),
  performance_score: z.number(),
  is_available: z.boolean(),
});
export type StaffContractorRecord = z.infer<typeof StaffContractorRecordSchema>;

export const AuditLogRecordSchema = z.object({
  id: z.string(),
  timestamp: z.string(),
  officer_name: z.string(),
  officer_role: z.string(),
  department_name: z.string(),
  action_type: z.enum([
    "REPORT_ACCEPTED",
    "TASK_CREATED",
    "TASK_PROGRESS_UPDATED",
    "TASK_COMPLETION_SUBMITTED",
    "TASK_VERIFIED_RESOLVED",
    "TASK_RETURNED_REJECTED",
    "EXTENSION_REQUESTED",
    "EXTENSION_APPROVED",
    "EXTENSION_REJECTED",
    "ASSET_REGISTERED",
    "ASSET_STATUS_UPDATED",
    "RESOLUTION_DISPUTE_REOPENED",
    "REPORTS_MERGED",
  ]),
  target_entity_type: z.enum(["REPORT", "TASK", "ASSET", "EXTENSION", "DEPARTMENT"]),
  target_code: z.string(),
  summary: z.string(),
  details: z.string(),
});
export type AuditLogRecord = z.infer<typeof AuditLogRecordSchema>;
