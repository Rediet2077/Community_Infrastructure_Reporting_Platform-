"use client";

import React from "react";
import { Input } from "@/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";
import { Field, FieldLabel, FieldError } from "@/ui/field";
import { useFormContext, Controller } from "react-hook-form";
import { AssetFormData } from "../../../types/asset_schemas";

export function StreetLightSpecsFields() {
  const { register, control, formState: { errors } } = useFormContext<AssetFormData>();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-6 gap-3">
      <Field className="sm:col-span-2" data-invalid={!!errors.sl_pole_type}>
        <FieldLabel className="text-xs font-semibold">Pole Material</FieldLabel>
        <Controller
          name="sl_pole_type"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Concrete" className="text-xs">Concrete</SelectItem>
                <SelectItem value="Steel" className="text-xs">Galvanized Steel</SelectItem>
                <SelectItem value="Wooden" className="text-xs">Treated Wood</SelectItem>
                <SelectItem value="Composite" className="text-xs">Composite Fiber</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={[errors.sl_pole_type]} />
      </Field>

      <Field className="sm:col-span-2" data-invalid={!!errors.sl_light_type}>
        <FieldLabel className="text-xs font-semibold">Luminaire Type</FieldLabel>
        <Controller
          name="sl_light_type"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="LED" className="text-xs">Modular LED</SelectItem>
                <SelectItem value="High-Pressure Sodium" className="text-xs">High-Pressure Sodium</SelectItem>
                <SelectItem value="Solar LED" className="text-xs">Standalone Solar LED</SelectItem>
                <SelectItem value="Halogen" className="text-xs">Halogen</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={[errors.sl_light_type]} />
      </Field>

      <Field className="sm:col-span-2" data-invalid={!!errors.sl_power_source}>
        <FieldLabel className="text-xs font-semibold">Power Source</FieldLabel>
        <Controller
          name="sl_power_source"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Grid" className="text-xs">Municipal Grid</SelectItem>
                <SelectItem value="Solar" className="text-xs">Solar PV</SelectItem>
                <SelectItem value="Hybrid" className="text-xs">Hybrid Grid/Solar</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={[errors.sl_power_source]} />
      </Field>

      <Field className="sm:col-span-3" data-invalid={!!errors.sl_height_meters}>
        <FieldLabel className="text-xs font-semibold">Pole Height (m)</FieldLabel>
        <Input className="h-9 text-xs" {...register("sl_height_meters")} />
        <FieldError errors={[errors.sl_height_meters]} />
      </Field>

      <Field className="sm:col-span-3" data-invalid={!!errors.sl_wattage}>
        <FieldLabel className="text-xs font-semibold">Wattage (W)</FieldLabel>
        <Input className="h-9 text-xs" {...register("sl_wattage")} />
        <FieldError errors={[errors.sl_wattage]} />
      </Field>
    </div>
  );
}

export function RoadSpecsFields() {
  const { register, control, formState: { errors } } = useFormContext<AssetFormData>();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-6 gap-3">
      <Field className="sm:col-span-6" data-invalid={!!errors.rd_road_name}>
        <FieldLabel className="text-xs font-semibold">Corridor Designation</FieldLabel>
        <Input className="h-9 text-xs" {...register("rd_road_name")} />
        <FieldError errors={[errors.rd_road_name]} />
      </Field>

      <Field className="sm:col-span-3" data-invalid={!!errors.rd_road_type}>
        <FieldLabel className="text-xs font-semibold">Road Category</FieldLabel>
        <Controller
          name="rd_road_type"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Arterial Highway" className="text-xs">Arterial Highway</SelectItem>
                <SelectItem value="Collector Road" className="text-xs">Collector Road</SelectItem>
                <SelectItem value="Local Street" className="text-xs">Local Street</SelectItem>
                <SelectItem value="Avenue" className="text-xs">Avenue</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={[errors.rd_road_type]} />
      </Field>

      <Field className="sm:col-span-3" data-invalid={!!errors.rd_surface_type}>
        <FieldLabel className="text-xs font-semibold">Surface Material</FieldLabel>
        <Controller
          name="rd_surface_type"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Asphalt" className="text-xs">Asphalt Concrete</SelectItem>
                <SelectItem value="Cobblestone" className="text-xs">Cobblestone</SelectItem>
                <SelectItem value="Gravel" className="text-xs">Compacted Gravel</SelectItem>
                <SelectItem value="Concrete Paved" className="text-xs">Rigid Concrete</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={[errors.rd_surface_type]} />
      </Field>

      <Field className="sm:col-span-2" data-invalid={!!errors.rd_length_km}>
        <FieldLabel className="text-xs font-semibold">Length (km)</FieldLabel>
        <Input className="h-9 text-xs" {...register("rd_length_km")} />
        <FieldError errors={[errors.rd_length_km]} />
      </Field>

      <Field className="sm:col-span-2" data-invalid={!!errors.rd_width_meters}>
        <FieldLabel className="text-xs font-semibold">Width (m)</FieldLabel>
        <Input className="h-9 text-xs" {...register("rd_width_meters")} />
        <FieldError errors={[errors.rd_width_meters]} />
      </Field>

      <Field className="sm:col-span-2" data-invalid={!!errors.rd_lanes_count}>
        <FieldLabel className="text-xs font-semibold">Lanes Count</FieldLabel>
        <Input className="h-9 text-xs" {...register("rd_lanes_count")} />
        <FieldError errors={[errors.rd_lanes_count]} />
      </Field>
    </div>
  );
}
