"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
} from "@/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { useAssetDetails } from "../../hooks/items/use_asset_details";
import { useAssetUIStore } from "../../store/asset_ui_store";
import { AssetDetailsHeader } from "./asset_details_header";
import { AssetSpecsSection } from "./asset_specs_section";

export function AssetDetailsDialog() {
  const { selectedAssetId, isDetailsDialogOpen, closeDetailsDialog } = useAssetUIStore();
  const { data: asset, isLoading } = useAssetDetails(selectedAssetId);

  if (!selectedAssetId) return null;

  return (
    <Dialog open={isDetailsDialogOpen} onOpenChange={(open) => !open && closeDetailsDialog()}>
      <DialogContent className="w-[95vw] sm:max-w-4xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto border-border bg-card p-4 sm:p-6">
        {isLoading || !asset ? (
          <div className="p-8 text-center text-sm font-normal text-muted-foreground">Loading asset specifications...</div>
        ) : (
          <>
            <AssetDetailsHeader
              name={asset.name}
              assetCode={asset.asset_code}
              assetTypeLabel={asset.asset_type_label}
              departmentName={asset.department_name}
              status={asset.status}
              condition={asset.condition}
            />

            <Tabs defaultValue="overview" className="w-full mt-2">
              <TabsList className="grid w-full grid-cols-2 bg-muted/40 p-1 border border-border">
                <TabsTrigger value="overview" className="text-sm font-medium">Technical Specifications</TabsTrigger>
                <TabsTrigger value="history" className="text-sm font-medium">Location & Audit</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 pt-3">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
                    Asset Overview
                  </h4>
                  <p className="text-sm font-normal text-foreground leading-relaxed bg-muted/20 p-3 rounded-lg border border-border">
                    {asset.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    Class-Specific Engineering Specs
                  </h4>
                  <AssetSpecsSection data={asset.specific_data} />
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-muted/20 rounded-lg border border-border text-sm font-normal">
                  <div>
                    <span className="text-sm text-muted-foreground block font-normal">Installed Date</span>
                    <span className="font-medium text-foreground">{asset.installation_date}</span>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground block font-normal">Last Inspection</span>
                    <span className="font-medium text-foreground">{asset.last_inspection_date}</span>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground block font-normal">Registered By</span>
                    <span className="font-medium text-foreground">{asset.registered_by}</span>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground block font-normal">Active Reports</span>
                    <span className="font-medium text-primary">{asset.active_reports_count} Incident(s)</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-4 pt-3">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Geographical GIS Location
                  </h4>
                  <div className="p-3 bg-muted/20 rounded-lg border border-border text-sm space-y-2">
                    <div>
                      <span className="font-medium text-foreground">{asset.address}</span>
                    </div>
                    <div className="text-muted-foreground font-normal">
                      <span>Landmark: {asset.landmark}</span>
                    </div>
                    <div className="pt-2 text-sm text-muted-foreground border-t border-border/50 font-normal">
                      Coordinates: Latitude {asset.latitude.toFixed(6)}, Longitude {asset.longitude.toFixed(6)}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Registry Timestamps
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-muted/20 rounded-lg border border-border text-sm font-normal">
                    <div>
                      <span className="text-sm text-muted-foreground block">
                        Created At
                      </span>
                      <span className="text-foreground">{asset.registered_at}</span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground block">
                        Last Updated
                      </span>
                      <span className="text-foreground">{asset.updated_at}</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
