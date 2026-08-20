"use client";

import React from "react";
import { AssetSpecificData } from "../../types/asset_types";

interface AssetSpecsSectionProps {
  data: AssetSpecificData | null | undefined;
}

export function AssetSpecsSection({ data }: AssetSpecsSectionProps) {
  if (!data) return null;

  switch (data.type) {
    case "street_light":
      return (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-3 bg-muted/30 p-3 rounded-lg border border-border text-xs">
          <div>
            <span className="text-xs text-muted-foreground block">Pole Type</span>
            <span className="font-medium text-foreground">{data.specs.pole_type}</span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">Light Type</span>
            <span className="font-medium text-foreground">{data.specs.light_type}</span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">Power Source</span>
            <span className="font-medium text-foreground">{data.specs.power_source}</span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">Height / Wattage</span>
            <span className="font-medium text-foreground">{data.specs.height_meters}m / {data.specs.wattage_watts}W</span>
          </div>
        </div>
      );
    case "road":
      return (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-3 bg-muted/30 p-3 rounded-lg border border-border text-xs">
          <div>
            <span className="text-xs text-muted-foreground block">Road Name</span>
            <span className="font-medium text-foreground">{data.specs.road_name}</span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">Surface Type</span>
            <span className="font-medium text-foreground">{data.specs.surface_type}</span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">Classification</span>
            <span className="font-medium text-foreground">{data.specs.road_type}</span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">Dimensions</span>
            <span className="font-medium text-foreground">{data.specs.length_km}km / {data.specs.lanes_count} Lanes</span>
          </div>
        </div>
      );
    case "water_point":
      return (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-3 bg-muted/30 p-3 rounded-lg border border-border text-xs">
          <div>
            <span className="text-xs text-muted-foreground block">Point Type</span>
            <span className="font-medium text-foreground">{data.specs.pipe_type}</span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">Diameter</span>
            <span className="font-medium text-foreground">{data.specs.pipe_diameter_mm} mm</span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">Material</span>
            <span className="font-medium text-foreground">{data.specs.material}</span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">Flow Rate</span>
            <span className="font-medium text-foreground">{data.specs.flow_capacity_lps} L/sec</span>
          </div>
        </div>
      );
    case "drainage":
      return (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-3 bg-muted/30 p-3 rounded-lg border border-border text-xs">
          <div>
            <span className="text-xs text-muted-foreground block">Canal Type</span>
            <span className="font-medium text-foreground">{data.specs.drain_type}</span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">Dimensions</span>
            <span className="font-medium text-foreground">{data.specs.width_meters}m W × {data.specs.depth_meters}m D</span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">Flow Direction</span>
            <span className="font-medium text-foreground">{data.specs.flow_direction}</span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">Safety Grating</span>
            <span className="font-medium text-foreground">{data.specs.has_safety_grate ? "Installed" : "Missing / None"}</span>
          </div>
        </div>
      );
    case "waste_bin":
      return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-muted/30 p-3 rounded-lg border border-border text-xs">
          <div>
            <span className="text-xs text-muted-foreground block">Station Model</span>
            <span className="font-medium text-foreground">{data.specs.bin_type}</span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">Capacity</span>
            <span className="font-medium text-foreground">{data.specs.capacity_liters} Liters</span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">Sensor ID</span>
            <span className="text-foreground">{data.specs.fill_level_sensor_id || "Unmonitored"}</span>
          </div>
        </div>
      );
    case "public_building":
      return (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-3 bg-muted/30 p-3 rounded-lg border border-border text-xs">
          <div>
            <span className="text-xs text-muted-foreground block">Facility Name</span>
            <span className="font-medium text-foreground">{data.specs.building_name}</span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">Facility Type</span>
            <span className="font-medium text-foreground">{data.specs.building_type}</span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">Floors</span>
            <span className="font-medium text-foreground">{data.specs.floors_count} Stories ({data.specs.construction_year})</span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">Emergency Shelter</span>
            <span className="font-medium text-foreground">{data.specs.has_emergency_shelter ? "Designated" : "No"}</span>
          </div>
        </div>
      );
    default:
      return null;
  }
}
