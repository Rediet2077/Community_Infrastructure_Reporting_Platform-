import { z } from "zod";

export const assetSchema = z.object({
  asset_type: z.enum(["street_light", "road", "water_point", "drainage", "waste_bin", "public_building"]),
  asset_code: z.string().min(1, "Asset code is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  department_id: z.string().min(1, "Department is required"),
  status: z.enum(["ACTIVE", "INACTIVE", "UNDER_MAINTENANCE", "DAMAGED", "DECOMMISSIONED"]),
  condition: z.enum(["EXCELLENT", "GOOD", "FAIR", "POOR", "CRITICAL"]),
  installation_date: z.string().min(1, "Date is required"),
  latitude: z.string().min(1, "Latitude is required"),
  longitude: z.string().min(1, "Longitude is required"),
  address: z.string().min(1, "Address is required"),
  landmark: z.string().optional(),
  
  // Street Light Specs
  sl_pole_type: z.enum(["Concrete", "Steel", "Wooden", "Composite"]).optional(),
  sl_light_type: z.enum(["LED", "High-Pressure Sodium", "Solar LED", "Halogen"]).optional(),
  sl_power_source: z.enum(["Grid", "Solar", "Hybrid"]).optional(),
  sl_height_meters: z.string().optional(),
  sl_wattage: z.string().optional(),

  // Road Specs
  rd_road_name: z.string().optional(),
  rd_road_type: z.enum(["Arterial Highway", "Collector Road", "Local Street", "Avenue"]).optional(),
  rd_surface_type: z.enum(["Asphalt", "Cobblestone", "Gravel", "Concrete Paved"]).optional(),
  rd_length_km: z.string().optional(),
  rd_width_meters: z.string().optional(),
  rd_lanes_count: z.string().optional(),

  // Water Point Specs
  wp_pipe_type: z.enum(["Distribution Main", "Service Pipe", "Public Kiosk", "Fire Hydrant"]).optional(),
  wp_pipe_diameter: z.string().optional(),
  wp_pipe_material: z.enum(["HDPE", "Ductile Iron", "PVC", "Cast Iron"]).optional(),
  wp_flow_capacity: z.string().optional(),
  wp_supply_source: z.enum(["Municipal Reservoir", "Deep Well", "Treatment Plant"]).optional(),

  // Drainage Specs
  dr_drain_type: z.enum(["Open Concrete Canal", "Underground Culvert", "Storm Sewer", "Side Gutter"]).optional(),
  dr_drain_width: z.string().optional(),
  dr_drain_depth: z.string().optional(),
  dr_flow_direction: z.enum(["North-South", "East-West", "Towards River Basin"]).optional(),

  // Waste Bin Specs
  wb_bin_type: z.enum(["Large Dumpster", "Recycling Station", "Solar Compactor", "Pedestrian Litter Bin"]).optional(),
  wb_bin_capacity: z.string().optional(),
  wb_collection_freq: z.enum(["Daily", "Twice Weekly", "Weekly"]).optional(),
  wb_sensor_id: z.string().optional(),

  // Public Building Specs
  pb_building_name: z.string().optional(),
  pb_building_type: z.enum(["Administrative Office", "Health Center", "Community Hall", "Public School", "Fire Station"]).optional(),
  pb_floors_count: z.string().optional(),
  pb_construction_year: z.string().optional(),
});

export type AssetFormData = z.infer<typeof assetSchema>;
