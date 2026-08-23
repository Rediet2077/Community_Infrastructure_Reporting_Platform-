"use client";

import React from "react";
import { Card } from "@/ui/card";
import { Input } from "@/ui/input";
import { ShieldWarningIcon } from "@phosphor-icons/react";
import { SystemSettings } from "../types/settings_types";

interface SettingsSlaCardProps {
  settings: SystemSettings;
  onChange: (updated: Partial<SystemSettings>) => void;
}

export function SettingsSlaCard({ settings, onChange }: SettingsSlaCardProps) {
  return (
    <Card className="p-5 border-border bg-card flex flex-col gap-4">
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <h2 className="text-base font-semibold text-foreground">SLA & Escalation Thresholds</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-muted/20 border border-border">
          <div className="flex items-center gap-1.5 text-destructive font-medium text-sm">
            <ShieldWarningIcon className="size-4" />
            <span>Critical Emergency</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Input
              type="number"
              value={settings.emergency_escalation_hours}
              onChange={(e) =>
                onChange({ emergency_escalation_hours: parseInt(e.target.value) || 6 })
              }
              className="h-9 text-sm font-semibold bg-background w-24"
            />
            <span className="text-sm font-normal text-muted-foreground">Hours</span>
          </div>
          <span className="text-sm font-normal text-muted-foreground mt-1">Live wire, main collapse</span>
        </div>

        <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-muted/20 border border-border">
          <span className="text-amber-500 font-medium text-sm">High Priority</span>
          <div className="flex items-center gap-2 mt-1">
            <Input
              type="number"
              value={settings.high_priority_sla_hours}
              onChange={(e) =>
                onChange({ high_priority_sla_hours: parseInt(e.target.value) || 24 })
              }
              className="h-9 text-sm font-semibold bg-background w-24"
            />
            <span className="text-sm font-normal text-muted-foreground">Hours</span>
          </div>
          <span className="text-sm font-normal text-muted-foreground mt-1">Major arterial pothole, pipe burst</span>
        </div>

        <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-muted/20 border border-border">
          <span className="text-blue-500 font-medium text-sm">Medium Priority</span>
          <div className="flex items-center gap-2 mt-1">
            <Input
              type="number"
              value={settings.medium_priority_sla_days}
              onChange={(e) =>
                onChange({ medium_priority_sla_days: parseInt(e.target.value) || 3 })
              }
              className="h-9 text-sm font-semibold bg-background w-24"
            />
            <span className="text-sm font-normal text-muted-foreground">Days</span>
          </div>
          <span className="text-sm font-normal text-muted-foreground mt-1">Overflowing dumpster, streetlight</span>
        </div>

        <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-muted/20 border border-border">
          <span className="text-muted-foreground font-medium text-sm">Low Priority</span>
          <div className="flex items-center gap-2 mt-1">
            <Input
              type="number"
              value={settings.low_priority_sla_days}
              onChange={(e) =>
                onChange({ low_priority_sla_days: parseInt(e.target.value) || 7 })
              }
              className="h-9 text-sm font-semibold bg-background w-24"
            />
            <span className="text-sm font-normal text-muted-foreground">Days</span>
          </div>
          <span className="text-sm font-normal text-muted-foreground mt-1">Minor cosmetic pavement wear</span>
        </div>
      </div>
    </Card>
  );
}
