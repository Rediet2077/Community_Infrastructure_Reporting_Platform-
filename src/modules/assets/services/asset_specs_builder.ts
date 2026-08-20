import { AssetSpecificData, AssetTypeKey } from "../types/asset_types";

interface AssetSpecsBuilderInput {
  assetType: AssetTypeKey;
  streetLight: {
    poleType: "Concrete" | "Steel" | "Wooden" | "Composite";
    lightType: "LED" | "High-Pressure Sodium" | "Solar LED" | "Halogen";
    powerSource: "Grid" | "Solar" | "Hybrid";
    heightMeters: string;
    wattage: string;
  };
  road: {
    roadName: string;
    roadType: "Arterial Highway" | "Collector Road" | "Local Street" | "Avenue";
    surfaceType: "Asphalt" | "Cobblestone" | "Gravel" | "Concrete Paved";
    lengthKm: string;
    widthMeters: string;
    lanesCount: string;
  };
  waterPoint: {
    pipeType: "Distribution Main" | "Service Pipe" | "Public Kiosk" | "Fire Hydrant";
    pipeDiameter: string;
    pipeMaterial: "HDPE" | "Ductile Iron" | "PVC" | "Cast Iron";
    flowCapacity: string;
    supplySource: "Municipal Reservoir" | "Deep Well" | "Treatment Plant";
  };
  drainage: {
    drainType: "Open Concrete Canal" | "Underground Culvert" | "Storm Sewer" | "Side Gutter";
    drainWidth: string;
    drainDepth: string;
    flowDirection: "North-South" | "East-West" | "Towards River Basin";
  };
  wasteBin: {
    binType: "Large Dumpster" | "Recycling Station" | "Solar Compactor" | "Pedestrian Litter Bin";
    binCapacity: string;
    collectionFreq: "Daily" | "Twice Weekly" | "Weekly";
    sensorId: string;
  };
  publicBuilding: {
    buildingName: string;
    buildingType: "Administrative Office" | "Health Center" | "Community Hall" | "Public School" | "Fire Station";
    floorsCount: string;
    constructionYear: string;
  };
}

export function buildAssetSpecificData(input: AssetSpecsBuilderInput): AssetSpecificData {
  switch (input.assetType) {
    case "street_light":
      return {
        type: "street_light",
        specs: {
          pole_type: input.streetLight.poleType,
          light_type: input.streetLight.lightType,
          power_source: input.streetLight.powerSource,
          height_meters: parseFloat(input.streetLight.heightMeters) || 10,
          wattage_watts: parseInt(input.streetLight.wattage, 10) || 150,
        },
      };
    case "road":
      return {
        type: "road",
        specs: {
          road_name: input.road.roadName,
          road_type: input.road.roadType,
          surface_type: input.road.surfaceType,
          length_km: parseFloat(input.road.lengthKm) || 1.2,
          width_meters: parseFloat(input.road.widthMeters) || 12.0,
          lanes_count: parseInt(input.road.lanesCount, 10) || 2,
        },
      };
    case "water_point":
      return {
        type: "water_point",
        specs: {
          pipe_type: input.waterPoint.pipeType,
          pipe_diameter_mm: parseInt(input.waterPoint.pipeDiameter, 10) || 90,
          material: input.waterPoint.pipeMaterial,
          flow_capacity_lps: parseFloat(input.waterPoint.flowCapacity) || 24,
          supply_source: input.waterPoint.supplySource,
        },
      };
    case "drainage":
      return {
        type: "drainage",
        specs: {
          drain_type: input.drainage.drainType,
          width_meters: parseFloat(input.drainage.drainWidth) || 1.8,
          depth_meters: parseFloat(input.drainage.drainDepth) || 1.2,
          flow_direction: input.drainage.flowDirection,
          has_safety_grate: true,
        },
      };
    case "waste_bin":
      return {
        type: "waste_bin",
        specs: {
          bin_type: input.wasteBin.binType,
          capacity_liters: parseInt(input.wasteBin.binCapacity, 10) || 1100,
          collection_frequency: input.wasteBin.collectionFreq,
          fill_level_sensor_id: input.wasteBin.sensorId || undefined,
        },
      };
    case "public_building":
      return {
        type: "public_building",
        specs: {
          building_name: input.publicBuilding.buildingName,
          building_type: input.publicBuilding.buildingType,
          floors_count: parseInt(input.publicBuilding.floorsCount, 10) || 3,
          construction_year: parseInt(input.publicBuilding.constructionYear, 10) || 2021,
          has_emergency_shelter: true,
        },
      };
  }
}
