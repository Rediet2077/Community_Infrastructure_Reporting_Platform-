"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card";
import { AssetTypeKey } from "../../types/asset_types";
import {
  StreetLightSpecsFields,
  RoadSpecsFields,
} from "./specs/street_light_road_specs";
import {
  WaterPointSpecsFields,
  DrainageSpecsFields,
} from "./specs/water_drainage_specs";
import {
  WasteBinSpecsFields,
  PublicBuildingSpecsFields,
} from "./specs/waste_building_specs";

export interface AssetSpecsCardProps {
  assetType: AssetTypeKey;
}

export function AssetSpecsCard({ assetType }: AssetSpecsCardProps) {
  const typeLabel = assetType.replace(/_/g, " ").toUpperCase();

  return (
    <Card className="border-border bg-card">
      <CardHeader className="p-4 border-b border-border">
        <CardTitle className="text-base font-semibold">3. Engineering Specifications ({typeLabel})</CardTitle>
        <CardDescription className="text-sm font-normal text-muted-foreground mt-0.5">
          Class-tailored engineering telemetry for asset lifecycle management.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        {assetType === "street_light" && <StreetLightSpecsFields />}
        {assetType === "road" && <RoadSpecsFields />}
        {assetType === "water_point" && <WaterPointSpecsFields />}
        {assetType === "drainage" && <DrainageSpecsFields />}
        {assetType === "waste_bin" && <WasteBinSpecsFields />}
        {assetType === "public_building" && <PublicBuildingSpecsFields />}
      </CardContent>
    </Card>
  );
}
