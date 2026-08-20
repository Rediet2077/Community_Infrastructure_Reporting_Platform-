"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/ui/sidebar";
import { Badge } from "@/ui/badge";
import { CaretDownIcon } from "@phosphor-icons/react";
import { SidebarNavGroupConfig, SidebarNavItem } from "./sidebar_navigation_config";

export function SidebarNavGroup({ group }: { group: SidebarNavGroupConfig }) {
  const pathname = usePathname();

  return (
    <SidebarGroup className="py-2">
      <SidebarGroupLabel className="text-sm font-medium text-muted-foreground uppercase tracking-wider px-2 mb-1">
        {group.label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="gap-1">
          {group.items.map((item) => (
            <SidebarNavEntry key={item.title} item={item} pathname={pathname} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function SidebarNavEntry({
  item,
  pathname,
}: {
  item: SidebarNavItem;
  pathname: string;
}) {
  const IconComponent = item.icon;

  if (item.subItems && item.subItems.length > 0) {
    const isSubActive = item.subItems.some(
      (sub) => pathname === sub.url || pathname.startsWith(sub.url)
    );
    return <SidebarSubmenuEntry item={item} isSubActive={isSubActive} pathname={pathname} />;
  }

  const isActive =
    item.url === "/dashboard"
      ? pathname === "/dashboard"
      : pathname === item.url || pathname.startsWith(item.url);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        render={<Link href={item.url} />}
        isActive={isActive}
        className={`gap-3 cursor-pointer w-full flex items-center px-2.5 py-2.5 rounded-lg transition-colors ${
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-xs"
            : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 font-medium"
        }`}
      >
        <IconComponent
          weight={isActive ? "fill" : "bold"}
          className={`size-4 shrink-0 ${
            isActive ? "text-primary" : "text-muted-foreground"
          }`}
        />
        <span className={`text-sm ${isActive ? "font-semibold" : "font-medium"}`}>
          {item.title}
        </span>
      </SidebarMenuButton>
      {Boolean(item.badgeCount && item.badgeCount > 0) && (
        <SidebarMenuBadge>
          <Badge
            variant={item.badgeVariant || "outline"}
            className={`text-xs px-1.5 py-0.5 min-w-4 flex items-center justify-center font-normal ${
              item.pulse ? "animate-pulse" : ""
            }`}
          >
            {item.badgeCount}
          </Badge>
        </SidebarMenuBadge>
      )}
    </SidebarMenuItem>
  );
}

function SidebarSubmenuEntry({
  item,
  isSubActive,
  pathname,
}: {
  item: SidebarNavItem;
  isSubActive: boolean;
  pathname: string;
}) {
  const IconComponent = item.icon;
  const [isOpen, setIsOpen] = useState<boolean>(isSubActive);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={() => setIsOpen((prev) => !prev)}
        className="gap-3 justify-between cursor-pointer px-2.5 py-2.5"
      >
        <div className="flex items-center gap-3">
          <IconComponent
            weight={isSubActive ? "fill" : "bold"}
            className={`size-4 ${isSubActive ? "text-primary" : "text-muted-foreground"}`}
          />
          <span className={`text-sm ${isSubActive ? "font-semibold" : "font-medium"}`}>
            {item.title}
          </span>
        </div>
        <CaretDownIcon
          className={`size-3.5 text-muted-foreground transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </SidebarMenuButton>

      {isOpen && item.subItems && (
        <SidebarMenuSub>
          {item.subItems.map((sub) => {
            const SubIcon = sub.icon;
            const isChildActive = pathname === sub.url;
            return (
              <SidebarMenuSubItem key={sub.title}>
                <SidebarMenuSubButton
                  render={<Link href={sub.url} />}
                  isActive={isChildActive}
                  className={`text-sm cursor-pointer w-full ${
                    isChildActive ? "font-semibold text-primary" : "font-normal text-muted-foreground"
                  }`}
                >
                  <SubIcon className="size-4 mr-1" />
                  <span>{sub.title}</span>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            );
          })}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  );
}
