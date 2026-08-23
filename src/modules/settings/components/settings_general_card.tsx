"use client";

import React from "react";
import { Card } from "@/ui/card";
import { Input } from "@/ui/input";
import { Switch } from "@/ui/switch";
import { CpuIcon, MapPinIcon } from "@phosphor-icons/react";
import { SystemSettings } from "../types/settings_types";

interface SettingsGeneralCardProps {
  settings: SystemSettings;
  onChange: (updated: Partial<SystemSettings>) => void;
}

export function SettingsGeneralCard({ settings, onChange }: SettingsGeneralCardProps) {
  return (
    <Card className="p-5 border-border bg-card flex flex-col gap-4">
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <h2 className="text-base font-semibold text-foreground">Municipal Platform Identity</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-foreground">Platform Identifier</span>
          <Input
            value={settings.platform_name}
            onChange={(e) => onChange({ platform_name: e.target.value })}
            className="h-9 text-sm font-normal bg-background"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-foreground">Governing Municipality</span>
          <Input
            value={settings.city_name}
            onChange={(e) => onChange({ city_name: e.target.value })}
            className="h-9 text-sm font-normal bg-background"
          />
        </div>
      </div>

      <div className="pt-2 border-t border-border flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CpuIcon className="size-4 text-muted-foreground" />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">AI Auto-Triage & Category Prediction</span>
              <span className="text-sm font-normal text-muted-foreground">Automatically predict responsible department from citizen photo</span>
            </div>
          </div>
          <Switch
            checked={settings.auto_dispatch_ai}
            onCheckedChange={(checked) => onChange({ auto_dispatch_ai: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPinIcon className="size-4 text-muted-foreground" />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">Municipal Boundary Geofence Enforcement</span>
              <span className="text-sm font-normal text-muted-foreground">Reject or flag citizen reports outside municipal jurisdiction boundary</span>
            </div>
          </div>
          <Switch
            checked={settings.geofence_enforcement}
            onCheckedChange={(checked) => onChange({ geofence_enforcement: checked })}
          />
        </div>
      </div>
    </Card>
  );
}
