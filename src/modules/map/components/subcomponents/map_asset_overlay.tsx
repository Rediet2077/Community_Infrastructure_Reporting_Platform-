"use client";

import React from "react";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { EyeIcon, XIcon } from "@phosphor-icons/react";
import { AssetRecord } from "@/modules/assets/types/asset_types";

interface MapAssetOverlayProps {
  asset: AssetRecord;
  onClose: () => void;
  onInspect: (id: string) => void;
}

export function MapAssetOverlay({ asset, onClose, onInspect }: MapAssetOverlayProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "UNDER_MAINTENANCE":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "DAMAGED":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "🟢 Active";
      case "UNDER_MAINTENANCE":
        return "🟡 Under Maintenance";
      case "DAMAGED":
        return "🔴 Damaged (Reports Pending)";
      default:
        return "⚪ Inactive";
    }
  };

  return (
    <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-96 p-4 rounded-lg bg-card/95 backdrop-blur border border-border shadow-xl text-sm space-y-3 animate-in fade-in slide-in-from-bottom-2">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground text-sm">{asset.asset_code}</span>
            <Badge variant="outline" className={`text-sm font-normal py-0.5 ${getStatusColor(asset.status)}`}>
              {asset.status}
            </Badge>
          </div>
          <h4 className="font-medium text-foreground mt-0.5 text-sm">{asset.name}</h4>
          <span className="text-sm font-normal text-muted-foreground">{asset.department_name}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="size-7 p-0 text-muted-foreground hover:text-foreground"
          onClick={onClose}
        >
          <XIcon className="size-4" />
        </Button>
      </div>

      <div className="p-2.5 bg-muted/30 rounded border border-border space-y-1 text-sm font-normal">
        <div className="text-muted-foreground">{asset.address}</div>
        <div className="text-muted-foreground">
          GPS: {asset.latitude.toFixed(4)}, {asset.longitude.toFixed(4)}
        </div>
      </div>

      <div className="flex items-center justify-between pt-1">
        <span className="text-sm font-medium">
          Status: {getStatusEmoji(asset.status)}
        </span>
        <Button
          size="sm"
          className="h-8 text-sm font-medium gap-1"
          onClick={() => onInspect(asset.id)}
        >
          <EyeIcon className="size-4" />
          <span>Inspect Full Specs</span>
        </Button>
      </div>
    </div>
  );
}
