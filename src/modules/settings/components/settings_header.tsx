"use client";

import React from "react";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { FloppyDiskIcon } from "@phosphor-icons/react";

interface SettingsHeaderProps {
  onSave?: () => void;
}

export function SettingsHeader({ onSave }: SettingsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            System & Operational Settings
          </h1>
        </div>
        <p className="text-sm font-normal text-muted-foreground mt-1">
          Configure CIRP municipal infrastructure parameters, SLA escalation thresholds, AI categorization, and notifications.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Badge variant="outline" className="text-sm font-normal py-0.5 px-2.5 text-muted-foreground">
          CIRP Core v2.4
        </Badge>
        <Button size="sm" onClick={onSave} className="h-9 text-sm font-medium gap-1.5">
          <FloppyDiskIcon weight="bold" className="size-3.5" />
          <span>Save Changes</span>
        </Button>
      </div>
    </div>
  );
}
