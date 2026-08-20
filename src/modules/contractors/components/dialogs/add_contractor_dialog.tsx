"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { useContractorUIStore } from "../../store/contractor_ui_store";
import { AddContractorForm } from "./add_contractor_form";

export function AddContractorDialog() {
  const { isAddDialogOpen, setIsAddDialogOpen } = useContractorUIStore();

  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogContent className="w-[95vw] sm:max-w-xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto border-border bg-card p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold text-foreground">
            Onboard Municipal Officer / Contractor Lead
          </DialogTitle>
          <DialogDescription className="text-sm font-normal text-muted-foreground mt-0.5">
            Register a verified field technician or private contractor company to receive dispatch work orders.
          </DialogDescription>
        </DialogHeader>

        <AddContractorForm onClose={() => setIsAddDialogOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
