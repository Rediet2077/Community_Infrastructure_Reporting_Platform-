"use client";

import React from "react";
import { Badge } from "@/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { UserIcon } from "@phosphor-icons/react";
import { DEMO_PRESETS, DemoAccountPreset } from "../../types/auth_types";

interface DemoAccountSwitcherProps {
  onSelectPreset: (preset: DemoAccountPreset) => void;
  selectedEmail?: string;
}

export function DemoAccountSwitcher({
  onSelectPreset,
  selectedEmail,
}: DemoAccountSwitcherProps) {
  const currentPreset = DEMO_PRESETS.find((p) => p.email === selectedEmail);

  return (
    <div className="flex flex-col gap-2 pt-2 border-t border-border">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
          <UserIcon className="size-3.5" />
          Quick Demo Accounts
        </span>
        <Badge variant="secondary" className="text-sm px-1.5 py-0">
          Dev Mode
        </Badge>
      </div>

      <Select
        value={selectedEmail || ""}
        onValueChange={(val) => {
          if (!val) return;
          const preset = DEMO_PRESETS.find((p) => p.email === val);
          if (preset) {
            onSelectPreset(preset);
          }
        }}
      >
        <SelectTrigger className="w-full text-sm h-8">
          <SelectValue placeholder="Select demo credentials...">
            {currentPreset ? (
              <span className="truncate">
                {currentPreset.title} &mdash; {currentPreset.name}
              </span>
            ) : undefined}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="w-[var(--anchor-width)]">
          {DEMO_PRESETS.map((preset) => (
            <SelectItem
              key={preset.email}
              value={preset.email}
              className="text-sm py-1.5"
            >
              <div className="flex flex-col items-start text-left gap-1">
                <span className="font-medium text-foreground">
                  {preset.title} ({preset.name})
                </span>
                <span className="text-sm text-muted-foreground">
                  {preset.department_name} &bull; {preset.email}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
