"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";
import { Field, FieldLabel, FieldError } from "@/ui/field";
import { AssetTypeKey } from "../../types/asset_types";
import { useFormContext, Controller } from "react-hook-form";
import { AssetFormData } from "../../types/asset_schemas";

interface AssetClassificationCardProps {
  assetType: AssetTypeKey;
  onTypeChange: (type: AssetTypeKey) => void;
  departments?: Array<{ id: string; name: string; code: string }>;
  assetTypes?: Array<{ id: string; name: string }>;
}

export function AssetClassificationCard({
  assetType,
  onTypeChange,
  departments,
  assetTypes,
}: AssetClassificationCardProps) {
  const { register, control, formState: { errors } } = useFormContext<AssetFormData>();

  return (
    <Card className="h-full flex flex-col border-border bg-card">
      <CardHeader className="p-4 border-b border-border">
        <CardTitle className="text-base font-semibold">1. Asset Classification & Hierarchy</CardTitle>
        <CardDescription className="text-sm font-normal text-muted-foreground mt-0.5">
          Select the physical class to dynamically generate required engineering fields.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Field data-invalid={!!errors.asset_type}>
              <FieldLabel className="text-sm font-medium">Asset Class / Type</FieldLabel>
              <Controller
                name="asset_type"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={(val) => {
                    field.onChange(val);
                    onTypeChange(val as AssetTypeKey);
                  }}>
                    <SelectTrigger className="h-9 text-sm font-normal"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {(assetTypes || []).map((t) => (
                        <SelectItem key={t.id} value={t.id} className="text-sm font-normal">{t.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError errors={[errors.asset_type]} />
            </Field>

            <Field data-invalid={!!errors.asset_code}>
              <FieldLabel className="text-sm font-medium">Unique Asset Code</FieldLabel>
              <Input className="h-9 text-sm font-medium" {...register("asset_code")} />
              <FieldError errors={[errors.asset_code]} />
            </Field>

            <Field data-invalid={!!errors.department_id}>
              <FieldLabel className="text-sm font-medium">Responsible Department</FieldLabel>
              <Controller
                name="department_id"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="h-9 text-sm font-normal"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {(departments || []).map((d) => (
                        <SelectItem key={d.id} value={d.id} className="text-sm font-normal">{d.name} ({d.code})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError errors={[errors.department_id]} />
            </Field>
          </div>

          <Field data-invalid={!!errors.name}>
            <FieldLabel className="text-sm font-medium">Descriptive Asset Label / Name</FieldLabel>
            <Input
              className="h-9 text-sm font-normal"
              placeholder="e.g. Bole Medhanialem High Mast Light #42"
              {...register("name")}
            />
            <FieldError errors={[errors.name]} />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Field data-invalid={!!errors.status}>
              <FieldLabel className="text-sm font-medium">Initial Status</FieldLabel>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="h-9 text-sm font-normal"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVE" className="text-sm font-normal">Active</SelectItem>
                      <SelectItem value="UNDER_MAINTENANCE" className="text-sm font-normal">Under Maintenance</SelectItem>
                      <SelectItem value="DAMAGED" className="text-sm font-normal">Damaged</SelectItem>
                      <SelectItem value="INACTIVE" className="text-sm font-normal">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError errors={[errors.status]} />
            </Field>

            <Field data-invalid={!!errors.condition}>
              <FieldLabel className="text-sm font-medium">Condition</FieldLabel>
              <Controller
                name="condition"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="h-9 text-sm font-normal"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EXCELLENT" className="text-sm font-normal">Excellent</SelectItem>
                      <SelectItem value="GOOD" className="text-sm font-normal">Good</SelectItem>
                      <SelectItem value="FAIR" className="text-sm font-normal">Fair</SelectItem>
                      <SelectItem value="POOR" className="text-sm font-normal">Poor</SelectItem>
                      <SelectItem value="CRITICAL" className="text-sm font-normal">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError errors={[errors.condition]} />
            </Field>

            <Field data-invalid={!!errors.installation_date}>
              <FieldLabel className="text-sm font-medium">Install Date</FieldLabel>
              <Input type="date" className="h-9 text-sm font-normal" {...register("installation_date")} />
              <FieldError errors={[errors.installation_date]} />
            </Field>
          </div>
        </div>

        <Field className="flex-1 flex flex-col pt-1" data-invalid={!!errors.description}>
          <FieldLabel className="text-sm font-medium">Technical Functional Description</FieldLabel>
          <Textarea
            className="text-sm font-normal flex-1 min-h-[96px] resize-none"
            placeholder="Describe electrical feed, capacity, connectivity, and surrounding environment..."
            {...register("description")}
          />
          <FieldError errors={[errors.description]} />
        </Field>
      </CardContent>
    </Card>
  );
}
