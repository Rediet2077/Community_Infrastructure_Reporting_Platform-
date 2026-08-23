"use client";

import React from "react";
import { Button } from "@/ui/button";
import { useContractorUIStore } from "../store/contractor_ui_store";

export function ContractorsHeader() {
  const { setIsAddDialogOpen } = useContractorUIStore();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Contractors & Field Staff Management
        </h1>
        <p className="text-sm font-normal text-muted-foreground mt-1">
          Certified private maintenance contractors and municipal technical teams responsible for executing work orders.
        </p>
      </div>

      <Button
        size="sm"
        className="text-sm font-medium h-9"
        onClick={() => setIsAddDialogOpen(true)}
      >
        Register Technician / Contractor
      </Button>
    </div>
  );
}
