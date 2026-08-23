"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
} from "@/ui/dialog";
import { Button } from "@/ui/button";
import { LinkIcon } from "@phosphor-icons/react";
import { useReportDetails } from "../../hooks/items/use_report_details";
import { useLinkAsset } from "../../hooks/update/use_link_asset";
import { useReportUIStore } from "../../store/report_ui_store";
import { ReportDetailsHeader } from "./report_details_header";
import { ReportAiInsights } from "./report_ai_insights";

export function ReportDetailsDialog() {
  const { selectedReportId, isDetailsDialogOpen, closeDetailsDialog, openAcceptDialog } = useReportUIStore();
  const { data: report, isLoading } = useReportDetails(selectedReportId);
  const linkAssetMutation = useLinkAsset();

  if (!selectedReportId) return null;

  return (
    <Dialog open={isDetailsDialogOpen} onOpenChange={(open) => !open && closeDetailsDialog()}>
      <DialogContent className="w-[95vw] sm:max-w-2xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto border-border bg-card p-4 sm:p-6">
        {isLoading || !report ? (
          <div className="p-8 text-center text-sm font-normal text-muted-foreground">Loading report details...</div>
        ) : (
          <>
            <ReportDetailsHeader
              report={report}
              onAccept={() => openAcceptDialog(report.id)}
            />

            <div className="space-y-6 pt-4">
              {/* Title and Citizen Description */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">{report.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {report.description}
                </p>
              </div>

              {/* AI Triage and Duplicate Intelligence */}
              <ReportAiInsights report={report} />

              <div className="h-px w-full bg-border" />

              {/* Citizen & Location Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="text-sm space-y-1">
                  <span className="text-muted-foreground font-medium">Reporting Citizen</span>
                  <div className="font-medium text-foreground">{report.citizen_name}</div>
                  <div className="text-muted-foreground">{report.citizen_contact}</div>
                </div>

                <div className="text-sm space-y-1">
                  <span className="text-muted-foreground font-medium">Location</span>
                  <div className="font-medium text-foreground">{report.address}</div>
                  <div className="text-muted-foreground">Landmark: {report.landmark}</div>
                </div>
              </div>

              <div className="h-px w-full bg-border" />

              {/* Linked Asset */}
              <div className="text-sm space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="font-medium text-muted-foreground">Target Physical Asset</span>
                  <span className="font-medium text-foreground">{report.department_name}</span>
                </div>

                {report.asset_code ? (
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{report.asset_code}</span>
                    <span className="text-muted-foreground font-normal">({report.asset_type_label})</span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <span className="text-destructive font-normal block">
                      No asset explicitly tagged by citizen during submission.
                    </span>
                    {report.suggested_nearby_assets && report.suggested_nearby_assets.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-muted-foreground font-medium">Suggested Nearby GIS Assets:</span>
                        {report.suggested_nearby_assets.map((s) => (
                          <div
                            key={s.asset_id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-border/50 gap-2 text-sm last:border-0"
                          >
                            <div>
                              <span className="font-medium text-foreground">{s.asset_code}</span>
                              <span className="text-muted-foreground sm:ml-2 block sm:inline font-normal">
                                {s.asset_name} ({s.distance_meters}m away)
                              </span>
                            </div>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="h-8 text-sm font-normal w-full sm:w-auto"
                              onClick={() =>
                                linkAssetMutation.mutate({
                                  reportId: report.id,
                                  assetId: s.asset_id,
                                })
                              }
                            >
                              Link Asset
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
