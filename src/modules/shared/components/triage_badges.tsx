"use client";

import React from "react";
import { Badge } from "@/ui/badge";

export function getPriorityBadge(priority: string) {
  switch (priority) {
    case "CRITICAL":
      return <Badge variant="destructive" className="font-medium text-sm py-0.5">CRITICAL</Badge>;
    case "HIGH":
      return <Badge variant="secondary" className="font-medium text-primary text-sm py-0.5">HIGH</Badge>;
    case "MEDIUM":
      return <Badge variant="outline" className="text-foreground text-sm font-normal py-0.5">MEDIUM</Badge>;
    default:
      return <Badge variant="secondary" className="text-sm font-normal py-0.5">LOW</Badge>;
  }
}

export function getReportStatusBadge(status: string) {
  switch (status) {
    case "NEW":
      return <Badge variant="destructive" className="text-sm font-medium py-0.5">NEW</Badge>;
    case "ACCEPTED":
      return <Badge variant="outline" className="border-border text-foreground bg-secondary text-sm font-normal py-0.5">ACCEPTED</Badge>;
    case "IN_PROGRESS":
      return <Badge variant="secondary" className="text-sm font-normal py-0.5">IN PROGRESS</Badge>;
    case "COMPLETED_PENDING_VERIFICATION":
      return <Badge variant="outline" className="border-border bg-muted text-sm font-normal py-0.5">VERIFY PENDING</Badge>;
    case "RESOLVED":
      return <Badge variant="outline" className="border-border text-foreground bg-secondary text-sm font-normal py-0.5">RESOLVED</Badge>;
    default:
      return <Badge variant="secondary" className="text-sm font-normal py-0.5">{status}</Badge>;
  }
}