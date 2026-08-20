"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Field, FieldLabel, FieldError } from "@/ui/field";
import { useFormContext } from "react-hook-form";
import { AssetFormData } from "../../types/asset_schemas";

export function AssetGisCard() {
  const { register, setValue, formState: { errors } } = useFormContext<AssetFormData>();

  const handleSimulateGps = () => {
    const lat = (9.0 + Math.random() * 0.05).toFixed(5);
    const lng = (38.74 + Math.random() * 0.08).toFixed(5);
    setValue("latitude", lat, { shouldValidate: true });
    setValue("longitude", lng, { shouldValidate: true });
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader className="p-4 border-b border-border flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base font-semibold">2. GIS Coordinates & Geographical Anchoring</CardTitle>
          <CardDescription className="text-sm font-normal text-muted-foreground mt-0.5">
            Coordinates anchor this asset on the municipal map for citizen triage and dispatch routing.
          </CardDescription>
        </div>
        <Button type="button" variant="outline" size="sm" className="h-8 text-sm font-medium" onClick={handleSimulateGps}>
          Simulate GPS Fix
        </Button>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field data-invalid={!!errors.latitude}>
            <FieldLabel className="text-sm font-medium">Latitude (WGS84)</FieldLabel>
            <Input className="h-9 text-sm font-normal" {...register("latitude")} />
            <FieldError errors={[errors.latitude]} />
          </Field>
          <Field data-invalid={!!errors.longitude}>
            <FieldLabel className="text-sm font-medium">Longitude (WGS84)</FieldLabel>
            <Input className="h-9 text-sm font-normal" {...register("longitude")} />
            <FieldError errors={[errors.longitude]} />
          </Field>
        </div>

        <Field data-invalid={!!errors.address}>
          <FieldLabel className="text-sm font-medium">Street Address / Corridor</FieldLabel>
          <Input
            className="h-9 text-sm font-normal"
            placeholder="e.g. Bole Atlas Rd, Woreda 03, Bole Sub-City"
            {...register("address")}
          />
          <FieldError errors={[errors.address]} />
        </Field>

        <Field data-invalid={!!errors.landmark}>
          <FieldLabel className="text-sm font-medium">Notable Landmark / Proximity Anchor</FieldLabel>
          <Input
            className="h-9 text-sm font-normal"
            placeholder="e.g. Opposite Edna Mall junction"
            {...register("landmark")}
          />
          <FieldError errors={[errors.landmark]} />
        </Field>
      </CardContent>
    </Card>
  );
}
