"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheckIcon } from "@phosphor-icons/react";

interface AuthBrandHeaderProps {
  subtitle?: string;
}

export function AuthBrandHeader({
  subtitle = "Civil Infrastructure & Reporting Platform",
}: AuthBrandHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center gap-2 mb-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2.5 group transition-transform active:scale-95"
      >
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm group-hover:opacity-90 transition-opacity">
          <ShieldCheckIcon weight="bold" className="size-6" />
        </div>
        <span className="font-bold tracking-tight text-2xl text-foreground">
          CIRP
        </span>
      </Link>
      <p className="text-sm text-muted-foreground max-w-xs">{subtitle}</p>
    </div>
  );
}
