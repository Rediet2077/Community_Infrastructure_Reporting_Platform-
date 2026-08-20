"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { PlusIcon } from "@phosphor-icons/react";
import { useMapData } from "../hooks/list/use_map_data";
import { useMapUIStore } from "../store/map_ui_store";
import { useAssetUIStore } from "@/modules/assets/store/asset_ui_store";
import { useNavigationStore } from "@/modules/shared/store/navigation_store";
import { MapCanvas } from "./subcomponents/map_canvas";
import { MapAssetOverlay } from "./subcomponents/map_asset_overlay";

export function MapView() {
  const { selectedDepartmentFilter, currentUserRole, activeOfficerDepartmentId } = useNavigationStore();
  const effectiveDept = currentUserRole === "DEPARTMENT_ADMIN" ? activeOfficerDepartmentId : selectedDepartmentFilter;

  const { data: assets, isLoading } = useMapData(effectiveDept);
  const { layerFilter, setLayerFilter, selectedPinAsset, setSelectedPinAsset } = useMapUIStore();
  const { openDetailsDialog } = useAssetUIStore();

  const assetList = assets || [];

  const visibleAssets = assetList.filter((asset) => {
    if (layerFilter === "all") return true;
    return asset.asset_type_id === layerFilter;
  });

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            GIS Municipal Infrastructure Map
          </h1>
          <p className="text-sm font-normal text-muted-foreground mt-1">
            Real-time geospatial layout of public utilities, active incident clusters, and localized maintenance priority zones.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/dashboard/register-asset">
            <Button
              size="sm"
              className="h-9 text-sm font-medium gap-1.5"
            >
              <PlusIcon weight="bold" className="size-3.5" />
              <span>Register Asset at GPS Fix</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Layer Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-lg border border-border bg-card">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Map Layer:</span>
          <Select value={layerFilter} onValueChange={(val) => setLayerFilter(val || "all")}>
            <SelectTrigger className="h-9 text-sm font-normal w-52 bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-sm font-normal">All Infrastructure Assets</SelectItem>
              <SelectItem value="street_light" className="text-sm font-normal">Street Lights & Poles</SelectItem>
              <SelectItem value="road" className="text-sm font-normal">Roads & Corridors</SelectItem>
              <SelectItem value="water_point" className="text-sm font-normal">Water Points & Mains</SelectItem>
              <SelectItem value="drainage" className="text-sm font-normal">Drainage Canals</SelectItem>
              <SelectItem value="waste_bin" className="text-sm font-normal">Waste Compactor Depots</SelectItem>
              <SelectItem value="public_building" className="text-sm font-normal">Public Buildings</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4 text-sm font-normal text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-emerald-500 inline-block" /> Active</span>
          <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-amber-500 inline-block" /> Maintenance</span>
          <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-red-500 inline-block" /> Damaged</span>
          <Badge variant="outline" className="text-sm font-normal px-2.5 py-0.5">
            {visibleAssets.length} Pins Plotted
          </Badge>
        </div>
      </div>

      {/* Interactive GIS Vector Map Canvas */}
      <div className="relative w-full h-[600px] rounded-xl border border-border bg-card overflow-hidden shadow-inner flex items-center justify-center">
        <MapCanvas
          visibleAssets={visibleAssets}
          selectedPinAsset={selectedPinAsset}
          onSelectPin={setSelectedPinAsset}
          isLoading={isLoading}
        />

        {selectedPinAsset && (
          <MapAssetOverlay
            asset={selectedPinAsset}
            onClose={() => setSelectedPinAsset(null)}
            onInspect={openDetailsDialog}
          />
        )}
      </div>
    </div>
  );
}
