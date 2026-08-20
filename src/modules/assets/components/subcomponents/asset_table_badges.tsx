"use client";

import React from "react";
import { Badge } from "@/ui/badge";

export function getConditionBadge(condition: string) {
  switch (condition) {
    case "EXCELLENT":
      return <Badge variant="success" className="font-normal text-sm py-0.5">EXCELLENT</Badge>;
    case "GOOD":
      return <Badge variant="info" className="text-sm font-normal py-0.5">GOOD</Badge>;
    case "FAIR":
      return <Badge variant="warning" className="text-sm font-normal py-0.5">FAIR</Badge>;
    case "POOR":
      return <Badge variant="destructive" className="text-sm font-normal py-0.5">POOR</Badge>;
    case "CRITICAL":
      return <Badge variant="destructive" className="font-medium text-sm py-0.5">CRITICAL</Badge>;
    default:
      return <Badge variant="secondary" className="text-sm font-normal py-0.5">{condition}</Badge>;
  }
}

export function getStatusBadge(status: string) {
  switch (status) {
    case "ACTIVE":
      return <Badge variant="success" className="text-sm font-normal py-0.5">ACTIVE</Badge>;
    case "UNDER_MAINTENANCE":
      return <Badge variant="warning" className="text-sm font-normal py-0.5">MAINTENANCE</Badge>;
    case "DAMAGED":
      return <Badge variant="destructive" className="text-sm font-normal py-0.5">DAMAGED</Badge>;
    case "INACTIVE":
      return <Badge variant="secondary" className="text-sm font-normal py-0.5">INACTIVE</Badge>;
    case "DECOMMISSIONED":
      return <Badge variant="outline" className="text-sm font-normal py-0.5">DECOMMISSIONED</Badge>;
    default:
      return <Badge variant="secondary" className="text-sm font-normal py-0.5">{status}</Badge>;
  }
}
