"use client";

import React from "react";
import { TableHeader, TableRow, TableHead } from "@/ui/table";

export function ContractorsTableHeader() {
  return (
    <TableHeader>
      <TableRow className="border-border hover:bg-transparent">
        <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Name</TableHead>
        <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Phone</TableHead>
        <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Email</TableHead>
        <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Type</TableHead>
        <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Company</TableHead>
        <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Department</TableHead>
        <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Specialization</TableHead>
        <TableHead className="text-sm font-medium uppercase tracking-wider text-center text-muted-foreground">Active Tasks</TableHead>
        <TableHead className="text-sm font-medium uppercase tracking-wider text-center text-muted-foreground">Score</TableHead>
        <TableHead className="text-sm font-medium uppercase tracking-wider text-right text-muted-foreground">Status</TableHead>
      </TableRow>
    </TableHeader>
  );
}
