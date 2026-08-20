"use client";

import React from "react";
import { Input } from "@/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { useContractorUIStore } from "../../store/contractor_ui_store";

export function ContractorsFilterBar() {
  const { searchQuery, setSearchQuery, typeFilter, setTypeFilter } = useContractorUIStore();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border-b border-border">
      <div className="flex-1 max-w-sm">
        <Input
          placeholder="Search staff, contractor company, skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-9 text-sm font-normal bg-background"
        />
      </div>

      <div className="flex items-center gap-2">
        <Select value={typeFilter} onValueChange={(val) => setTypeFilter(val || "all")}>
          <SelectTrigger className="h-9 text-sm font-normal w-48">
            <SelectValue placeholder="All Entity Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-sm font-normal">All Staff & Contractors</SelectItem>
            <SelectItem value="contractor" className="text-sm font-normal">Contractor Firms Only</SelectItem>
            <SelectItem value="staff" className="text-sm font-normal">Internal Officers Only</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
