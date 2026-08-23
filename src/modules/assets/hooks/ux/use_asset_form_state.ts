"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AssetTypeKey } from "../../types/asset_types";
import { useRegisterAsset } from "../create/use_register_asset";
import { useDepartmentList } from "@/modules/departments/hooks/list/use_department_list";
import { useAssetTypeList } from "../list/use_asset_type_list";
import { useNavigationStore } from "@/modules/shared/store/navigation_store";
import { buildAssetSpecificData } from "../../services/asset_specs_builder";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { assetSchema, AssetFormData } from "../../types/asset_schemas";

export function useAssetFormState() {
  const router = useRouter();
  const { currentUserRole, activeOfficerDepartmentId } = useNavigationStore();
  const registerAssetMutation = useRegisterAsset();
  const { data: departments } = useDepartmentList();
  const { data: assetTypes } = useAssetTypeList();
  const [isSuccess, setIsSuccess] = useState(false);

  const methods = useForm<AssetFormData>({
    resolver: zodResolver(assetSchema),
    defaultValues: {
      asset_type: "street_light",
      asset_code: "SL-00127",
      name: "Bole Atlas Avenue Street Light #127",
      description: "Standard LED municipal street lighting unit installed on main arterial route.",
      department_id: currentUserRole === "DEPARTMENT_ADMIN" ? activeOfficerDepartmentId : "dept-el",
      status: "ACTIVE",
      condition: "EXCELLENT",
      installation_date: "2026-08-18",
      latitude: "9.0192",
      longitude: "38.7525",
      address: "Bole Atlas Rd, Woreda 03, Bole Sub-City",
      landmark: "Opposite Edna Mall junction",
      
      sl_pole_type: "Steel",
      sl_light_type: "LED",
      sl_power_source: "Grid",
      sl_height_meters: "10",
      sl_wattage: "150",
      
      rd_road_name: "Atlas Street Arterial",
      rd_road_type: "Collector Road",
      rd_surface_type: "Asphalt",
      rd_length_km: "1.2",
      rd_width_meters: "12.0",
      rd_lanes_count: "2",

      wp_pipe_type: "Public Kiosk",
      wp_pipe_diameter: "90",
      wp_pipe_material: "HDPE",
      wp_flow_capacity: "24",
      wp_supply_source: "Municipal Reservoir",

      dr_drain_type: "Open Concrete Canal",
      dr_drain_width: "1.8",
      dr_drain_depth: "1.2",
      dr_flow_direction: "Towards River Basin",

      wb_bin_type: "Large Dumpster",
      wb_bin_capacity: "1100",
      wb_collection_freq: "Daily",
      wb_sensor_id: "IOT-BIN-091",

      pb_building_name: "Woreda 03 Civic Administration Hub",
      pb_building_type: "Administrative Office",
      pb_floors_count: "4",
      pb_construction_year: "2022",
    },
  });

  const { setValue, watch, handleSubmit } = methods;
  const currentAssetType = watch("asset_type");

  const handleTypeChange = (type: AssetTypeKey) => {
    setValue("asset_type", type);
    const prefixes: Record<AssetTypeKey, string> = {
      street_light: "SL",
      road: "RD",
      water_point: "WP",
      drainage: "DR",
      waste_bin: "WB",
      public_building: "PB",
    };
    const randNum = Math.floor(1000 + Math.random() * 9000);
    setValue("asset_code", `${prefixes[type]}-${randNum}`);
  };

  const onSubmit = async (data: AssetFormData) => {
    const currentDeptObj = departments?.find((d) => d.id === data.department_id);
    const deptName = currentDeptObj ? currentDeptObj.name : "Engineering Department";
    const typeLabel = data.asset_type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    const specific_data = buildAssetSpecificData({
      assetType: data.asset_type,
      streetLight: { poleType: data.sl_pole_type as any, lightType: data.sl_light_type as any, powerSource: data.sl_power_source as any, heightMeters: data.sl_height_meters as any, wattage: data.sl_wattage as any },
      road: { roadName: data.rd_road_name as any, roadType: data.rd_road_type as any, surfaceType: data.rd_surface_type as any, lengthKm: data.rd_length_km as any, widthMeters: data.rd_width_meters as any, lanesCount: data.rd_lanes_count as any },
      waterPoint: { pipeType: data.wp_pipe_type as any, pipeDiameter: data.wp_pipe_diameter as any, pipeMaterial: data.wp_pipe_material as any, flowCapacity: data.wp_flow_capacity as any, supplySource: data.wp_supply_source as any },
      drainage: { drainType: data.dr_drain_type as any, drainWidth: data.dr_drain_width as any, drainDepth: data.dr_drain_depth as any, flowDirection: data.dr_flow_direction as any },
      wasteBin: { binType: data.wb_bin_type as any, binCapacity: data.wb_bin_capacity as any, collectionFreq: data.wb_collection_freq as any, sensorId: data.wb_sensor_id as any },
      publicBuilding: { buildingName: data.pb_building_name as any, buildingType: data.pb_building_type as any, floorsCount: data.pb_floors_count as any, constructionYear: data.pb_construction_year as any },
    });

    await registerAssetMutation.mutateAsync({
      asset_code: data.asset_code,
      asset_type_id: data.asset_type,
      asset_type_label: typeLabel,
      department_id: data.department_id,
      department_name: deptName,
      name: data.name,
      description: data.description || "",
      status: data.status,
      condition: data.condition,
      installation_date: data.installation_date,
      latitude: parseFloat(data.latitude) || 9.0192,
      longitude: parseFloat(data.longitude) || 38.7525,
      address: data.address,
      landmark: data.landmark || "",
      registered_by: currentUserRole === "SYSTEM_ADMIN" ? "Eng. Dawit Tadesse (Admin)" : "Department Officer",
      last_inspection_date: data.installation_date,
      specific_data,
    });

    setIsSuccess(true);
    setTimeout(() => {
      router.push("/dashboard/all-assets");
    }, 1200);
  };

  return {
    methods,
    departments,
    assetTypes,
    isPending: registerAssetMutation.isPending,
    isSuccess,
    assetType: currentAssetType,
    handleTypeChange,
    onSubmit: handleSubmit(onSubmit),
  };
}
