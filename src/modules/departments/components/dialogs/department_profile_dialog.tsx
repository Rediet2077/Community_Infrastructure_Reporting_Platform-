"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Badge } from "@/ui/badge";

import { useDepartmentList } from "../../hooks/list/use_department_list";
import { useDepartmentUIStore } from "../../store/department_ui_store";

export function DepartmentProfileDialog() {
  const { selectedDepartmentId, isProfileDialogOpen, closeProfileDialog } = useDepartmentUIStore();
  const { data: departments } = useDepartmentList();

  const dept = departments?.find((d) => d.id === selectedDepartmentId);
  if (!dept) return null;

  return (
    <Dialog open={isProfileDialogOpen} onOpenChange={(open) => !open && closeProfileDialog()}>
      <DialogContent className="w-[95vw] sm:max-w-3xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto border-border bg-card p-4 sm:p-6">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start sm:items-center gap-3">

              <div className="space-y-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <DialogTitle className="text-base sm:text-lg font-semibold text-foreground">
                    {dept.name}
                  </DialogTitle>
                  <Badge variant="outline" className="text-sm font-normal">
                    {dept.code}
                  </Badge>
                </div>
                <DialogDescription className="text-sm font-normal text-muted-foreground">
                  {dept.description}
                </DialogDescription>
              </div>
            </div>

            <Badge variant="outline" className="border-border text-foreground bg-secondary text-sm font-medium py-1 px-2.5 self-start sm:self-auto">
              {dept.resolution_rate_percent}% Resolution Rate
            </Badge>
          </div>
        </DialogHeader>

        {/* Contact and Office Location */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-muted/20 rounded-lg border border-border text-sm">
          <div>
            <span className="text-sm text-muted-foreground block font-normal">Office Location</span>
            <span className="font-medium text-foreground">{dept.office_location}</span>
          </div>
          <div>
            <span className="text-sm text-muted-foreground block font-normal">Official Email</span>
            <span className="font-medium text-foreground break-all">{dept.contact_email}</span>
          </div>
          <div>
            <span className="text-sm text-muted-foreground block font-normal">Phone Contact</span>
            <span className="font-medium text-foreground">{dept.contact_phone}</span>
          </div>
        </div>

        {/* Performance Metrics Cards */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-3 py-1">
          <div className="p-3.5 rounded-lg border border-border bg-card">
            <span className="text-sm font-medium text-muted-foreground block uppercase tracking-wider">Avg Intake</span>
            <span className="text-xl font-semibold text-foreground mt-1 block">
              {dept.avg_acceptance_hours} hrs
            </span>
            <span className="text-sm font-normal text-muted-foreground mt-0.5 block">Within 4h SLA</span>
          </div>
          <div className="p-3.5 rounded-lg border border-border bg-card">
            <span className="text-sm font-medium text-muted-foreground block uppercase tracking-wider">Avg Resolution</span>
            <span className="text-xl font-semibold text-foreground mt-1 block">
              {dept.avg_completion_days} days
            </span>
            <span className="text-sm font-normal text-muted-foreground mt-0.5 block">Target &lt; 4 days</span>
          </div>
          <div className="p-3.5 rounded-lg border border-border bg-card">
            <span className="text-sm font-medium text-muted-foreground block uppercase tracking-wider">Managed Assets</span>
            <span className="text-xl font-semibold text-foreground mt-1 block">
              {dept.total_assets.toLocaleString()}
            </span>
            <span className="text-sm font-normal text-muted-foreground mt-0.5 block">GIS Units</span>
          </div>
          <div className="p-3.5 rounded-lg border border-border bg-card">
            <span className="text-sm font-medium text-muted-foreground block uppercase tracking-wider">Active Workload</span>
            <span className="text-xl font-semibold text-foreground mt-1 block">
              {dept.active_tasks} Tasks
            </span>
            <span className="text-sm text-destructive font-medium mt-0.5 block">{dept.overdue_tasks} Overdue</span>
          </div>
        </div>

        {/* Responsible Asset Types */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Assigned Asset Classes
          </h4>
          <div className="flex flex-wrap gap-2">
            {dept.responsible_asset_types.map((typeKey) => (
              <Badge key={typeKey} variant="secondary" className="capitalize text-sm font-normal py-0.5">
                {typeKey.replace(/_/g, " ")}
              </Badge>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
