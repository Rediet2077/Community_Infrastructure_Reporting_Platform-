"use client";

import React from "react";
import { Card } from "@/ui/card";
import { Switch } from "@/ui/switch";
import { ChatCenteredDotsIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react";
import { SystemSettings } from "../types/settings_types";

interface SettingsNotificationsCardProps {
  settings: SystemSettings;
  onChange: (updated: Partial<SystemSettings>) => void;
}

export function SettingsNotificationsCard({
  settings,
  onChange,
}: SettingsNotificationsCardProps) {
  return (
    <Card className="p-5 border-border bg-card flex flex-col gap-4">
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <h2 className="text-base font-semibold text-foreground">Notification & Broadcast Rules</h2>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ChatCenteredDotsIcon className="size-4 text-muted-foreground" />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">Automated Citizen SMS Progress Updates</span>
              <span className="text-sm font-normal text-muted-foreground">Send SMS notifications on report acceptance and resolution completion</span>
            </div>
          </div>
          <Switch
            checked={settings.sms_citizen_updates}
            onCheckedChange={(checked) => onChange({ sms_citizen_updates: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <EnvelopeSimpleIcon className="size-4 text-muted-foreground" />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">Department Daily Performance Digest</span>
              <span className="text-sm font-normal text-muted-foreground">Send daily 08:00 morning summary of active work orders and overdue warnings</span>
            </div>
          </div>
          <Switch
            checked={settings.email_department_digests}
            onCheckedChange={(checked) => onChange({ email_department_digests: checked })}
          />
        </div>
      </div>
    </Card>
  );
}
