import React from "react";
import {
  HouseIcon,
  ClipboardTextIcon,
  BuildingsIcon,
  HardHatIcon,
  UsersIcon,
  ChartBarIcon,
  BellIcon,
  GearIcon,
  IconProps,
} from "@phosphor-icons/react";

export interface SidebarSubItem {
  title: string;
  url: string;
  icon: React.ComponentType<IconProps>;
}

export interface SidebarNavItem {
  title: string;
  url: string;
  icon: React.ComponentType<IconProps>;
  badgeCount?: number;
  badgeVariant?: "destructive" | "outline";
  pulse?: boolean;
  subItems?: SidebarSubItem[];
}

export interface SidebarNavGroupConfig {
  label: string;
  items: SidebarNavItem[];
}

export function getSidebarNavigationGroups(counts: {
  newReportsCount: number;
  unreadNotificationsCount?: number;
}): SidebarNavGroupConfig[] {
  return [
    {
      label: "Platform Navigation",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: HouseIcon,
        },
        {
          title: "Reports",
          url: "/dashboard/reports",
          icon: ClipboardTextIcon,
          badgeCount: counts.newReportsCount,
          badgeVariant: "destructive",
        },
        {
          title: "Departments",
          url: "/dashboard/departments",
          icon: BuildingsIcon,
        },
        {
          title: "Contractors",
          url: "/dashboard/contractors",
          icon: HardHatIcon,
        },
        {
          title: "Users",
          url: "/dashboard/users",
          icon: UsersIcon,
        },
        {
          title: "Analytics",
          url: "/dashboard/analytics",
          icon: ChartBarIcon,
        },
        {
          title: "Notifications",
          url: "/dashboard/notifications",
          icon: BellIcon,
          badgeCount: counts.unreadNotificationsCount,
          badgeVariant: "destructive",
        },
        {
          title: "Settings",
          url: "/dashboard/settings",
          icon: GearIcon,
        },
      ],
    },
  ];
}
