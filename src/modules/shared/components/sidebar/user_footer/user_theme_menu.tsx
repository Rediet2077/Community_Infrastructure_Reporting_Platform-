"use client";

import React from "react";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/ui/dropdown-menu";
import { SunIcon, MoonIcon, DesktopIcon, CheckIcon } from "@phosphor-icons/react";
import { useTheme } from "@/modules/shared/providers/theme_provider";

export function UserThemeMenu() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel className="text-sm uppercase font-medium tracking-wider text-muted-foreground px-2 py-1">
        Preferences
      </DropdownMenuLabel>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger className="flex items-center justify-between text-sm font-normal cursor-pointer rounded-md px-2 py-1.5">
          <div className="flex items-center gap-2">
            {resolvedTheme === "dark" ? (
              <MoonIcon className="size-4 text-foreground" />
            ) : (
              <SunIcon className="size-4 text-foreground" />
            )}
            <span>Theme</span>
          </div>
          <span className="text-sm text-muted-foreground capitalize mr-2">
            {theme}
          </span>
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="w-36 p-1 rounded-lg border border-border">
          <DropdownMenuItem
            onClick={() => setTheme("light")}
            className="flex items-center justify-between text-sm font-normal cursor-pointer rounded-md px-2 py-1.5"
          >
            <div className="flex items-center gap-2">
              <SunIcon className="size-4 text-foreground" />
              <span>Light</span>
            </div>
            {theme === "light" && <CheckIcon className="size-3.5 text-foreground" />}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme("dark")}
            className="flex items-center justify-between text-sm font-normal cursor-pointer rounded-md px-2 py-1.5"
          >
            <div className="flex items-center gap-2">
              <MoonIcon className="size-4 text-foreground" />
              <span>Dark</span>
            </div>
            {theme === "dark" && <CheckIcon className="size-3.5 text-foreground" />}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme("system")}
            className="flex items-center justify-between text-sm font-normal cursor-pointer rounded-md px-2 py-1.5"
          >
            <div className="flex items-center gap-2">
              <DesktopIcon className="size-4 text-foreground" />
              <span>System</span>
            </div>
            {theme === "system" && <CheckIcon className="size-3.5 text-foreground" />}
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    </DropdownMenuGroup>
  );
}
