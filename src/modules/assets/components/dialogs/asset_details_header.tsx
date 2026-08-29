"use client";

import React from "react";
import { DialogDescription, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Badge } from "@/ui/badge";
import { AssetStatus, AssetCondition } from "../../types/asset_types";

interface AssetDetailsHeaderProps {
  name: string;
  assetCode: string;
  assetTypeLabel: string;
  departmentName: string;
  status: AssetStatus | string;
  condition: AssetCondition | string;
}

export function AssetDetailsHeader({
  name,
  assetCode,
  assetTypeLabel,
  departmentName,
  status,
  condition,
}: AssetDetailsHeaderProps) {
  const getConditionBadge = (cond: string) => {
    switch (cond) {
      case "EXCELLENT":
        return <Badge variant="secondary" className="font-medium text-primary text-sm py-0.5">EXCELLENT</Badge>;
      case "GOOD":
        return <Badge variant="outline" className="text-foreground text-sm font-normal py-0.5">GOOD</Badge>;
      case "FAIR":
        return <Badge variant="outline" className="text-muted-foreground text-sm font-normal py-0.5">FAIR</Badge>;
      case "POOR":
        return <Badge variant="destructive" className="text-sm font-normal py-0.5">POOR</Badge>;
      case "CRITICAL":
        return <Badge variant="destructive" className="font-medium text-sm py-0.5">CRITICAL</Badge>;
      default:
        return <Badge variant="secondary" className="text-sm font-normal py-0.5">{cond}</Badge>;
    }
  };

  const getStatusBadge = (st: string) => {
    switch (st) {
      case "ACTIVE":
        return <Badge variant="outline" className="border-border text-foreground bg-secondary text-sm font-normal py-0.5">ACTIVE</Badge>;
      case "UNDER_MAINTENANCE":
        return <Badge variant="outline" className="border-border text-muted-foreground bg-muted text-sm font-normal py-0.5">UNDER MAINTENANCE</Badge>;
      case "DAMAGED":
        return <Badge variant="destructive" className="text-sm font-normal py-0.5">DAMAGED</Badge>;
      case "INACTIVE":
        return <Badge variant="secondary" className="text-sm font-normal py-0.5">INACTIVE</Badge>;
      case "DECOMMISSIONED":
        return <Badge variant="outline" className="text-sm font-normal py-0.5">DECOMMISSIONED</Badge>;
      default:
        return <Badge variant="secondary" className="text-sm font-normal py-0.5">{st}</Badge>;
    }
  };

  return (
    <DialogHeader className="border-b border-border pb-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <DialogTitle className="text-base sm:text-lg font-semibold text-foreground">
              {name}
            </DialogTitle>
            <Badge variant="outline" className="text-sm font-normal">
              {assetCode}
            </Badge>
          </div>
          <DialogDescription className="text-sm font-normal text-muted-foreground flex flex-wrap items-center gap-1.5">
            <span>{assetTypeLabel}</span>
            <span>•</span>
            <span>{departmentName}</span>
          </DialogDescription>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {getStatusBadge(status)}
          {getConditionBadge(condition)}
        </div>
      </div>
    </DialogHeader>
  );
}
