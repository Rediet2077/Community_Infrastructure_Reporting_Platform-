"use client";

import React, { useState } from "react";
import { SettingsHeader } from "./settings_header";
import { SettingsGeneralCard } from "./settings_general_card";
import { SettingsSlaCard } from "./settings_sla_card";
import { SettingsNotificationsCard } from "./settings_notifications_card";
import { SystemSettings } from "../types/settings_types";

const INITIAL_SETTINGS: SystemSettings = {
  platform_name: "CIRP Central Operations Core",
  city_name: "Addis Ababa Municipal Administration",
  emergency_escalation_hours: 6,
  high_priority_sla_hours: 24,
  medium_priority_sla_days: 3,
  low_priority_sla_days: 7,
  auto_dispatch_ai: true,
  sms_citizen_updates: true,
  email_department_digests: true,
  gis_auto_clustering: true,
  geofence_enforcement: true,
};

export function SettingsView() {
  const [settings, setSettings] = useState<SystemSettings>(INITIAL_SETTINGS);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const handleUpdate = (updated: Partial<SystemSettings>) => {
    setSettings((prev) => ({ ...prev, ...updated }));
  };

  const handleSave = () => {
    setSaveStatus("Settings saved successfully!");
    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 w-full">
      <SettingsHeader onSave={handleSave} />

      {saveStatus && (
        <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold rounded-lg">
          {saveStatus}
        </div>
      )}

      <div className="flex flex-col gap-6">
        <SettingsGeneralCard settings={settings} onChange={handleUpdate} />
        <SettingsSlaCard settings={settings} onChange={handleUpdate} />
        <SettingsNotificationsCard settings={settings} onChange={handleUpdate} />
      </div>
    </div>
  );
}
