"use client";

import React from "react";
import { Card } from "@/ui/card";
import { StaffContractorRecord } from "../types/contractor_types";

interface ContractorsKpiCardsProps {
  contractors: StaffContractorRecord[];
}

export function ContractorsKpiCards({ contractors }: ContractorsKpiCardsProps) {
  const totalCount = contractors.length;
  const contractorCompaniesCount = contractors.filter((s) => s.is_contractor).length;
  const internalStaffCount = contractors.filter((s) => !s.is_contractor).length;

  const averageScore = totalCount > 0
    ? (contractors.reduce((acc, curr) => acc + curr.performance_score, 0) / totalCount).toFixed(1)
    : "93.4";

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <Card className="border-border bg-card p-4">
        <span className="text-sm font-medium text-muted-foreground block uppercase tracking-wider">Active Workforce</span>
        <div className="text-2xl font-semibold text-foreground tracking-tight mt-1">{totalCount}</div>
        <span className="text-sm font-normal text-muted-foreground mt-1 block">Certified entities in roster</span>
      </Card>
      <Card className="border-border bg-card p-4">
        <span className="text-sm font-medium text-muted-foreground block uppercase tracking-wider">Contractor Companies</span>
        <div className="text-2xl font-semibold text-foreground tracking-tight mt-1">
          {contractorCompaniesCount}
        </div>
        <span className="text-sm font-normal text-muted-foreground mt-1 block">Outsourced maintenance firms</span>
      </Card>
      <Card className="border-border bg-card p-4">
        <span className="text-sm font-medium text-muted-foreground block uppercase tracking-wider">Internal Staff</span>
        <div className="text-2xl font-semibold text-foreground tracking-tight mt-1">
          {internalStaffCount}
        </div>
        <span className="text-sm font-normal text-muted-foreground mt-1 block">Municipal engineering staff</span>
      </Card>
      <Card className="border-border bg-card p-4">
        <span className="text-sm font-medium text-muted-foreground block uppercase tracking-wider">Avg Performance</span>
        <div className="text-2xl font-semibold text-foreground tracking-tight mt-1">
          <span>{averageScore}%</span>
        </div>
        <span className="text-sm font-normal text-muted-foreground mt-1 block">Quality & SLA compliance</span>
      </Card>
    </div>
  );
}
