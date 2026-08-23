"use client";

import React from "react";
import { Input } from "@/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";
import { Field, FieldLabel, FieldError } from "@/ui/field";
import { useFormContext, Controller } from "react-hook-form";
import { AssetFormData } from "../../../types/asset_schemas";

export function WasteBinSpecsFields() {
  const { register, control, formState: { errors } } = useFormContext<AssetFormData>();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-6 gap-3">
      <Field className="sm:col-span-3" data-invalid={!!errors.wb_bin_type}>
        <FieldLabel className="text-xs font-semibold">Receptacle Type</FieldLabel>
        <Controller
          name="wb_bin_type"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Large Dumpster" className="text-xs">Large Communal Dumpster</SelectItem>
                <SelectItem value="Recycling Station" className="text-xs">Segregated Recycling Station</SelectItem>
                <SelectItem value="Solar Compactor" className="text-xs">Smart Solar Compactor</SelectItem>
                <SelectItem value="Pedestrian Litter Bin" className="text-xs">Pedestrian Litter Bin</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={[errors.wb_bin_type]} />
      </Field>

      <Field className="sm:col-span-3" data-invalid={!!errors.wb_collection_freq}>
        <FieldLabel className="text-xs font-semibold">Scheduled Collection Frequency</FieldLabel>
        <Controller
          name="wb_collection_freq"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Daily" className="text-xs">Daily Route</SelectItem>
                <SelectItem value="Twice Weekly" className="text-xs">Twice Weekly</SelectItem>
                <SelectItem value="Weekly" className="text-xs">Weekly Route</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={[errors.wb_collection_freq]} />
      </Field>

      <Field className="sm:col-span-3" data-invalid={!!errors.wb_bin_capacity}>
        <FieldLabel className="text-xs font-semibold">Volume Capacity (Liters)</FieldLabel>
        <Input className="h-9 text-xs" {...register("wb_bin_capacity")} />
        <FieldError errors={[errors.wb_bin_capacity]} />
      </Field>

      <Field className="sm:col-span-3" data-invalid={!!errors.wb_sensor_id}>
        <FieldLabel className="text-xs font-semibold">IoT Sensor ID (if applicable)</FieldLabel>
        <Input className="h-9 text-xs" placeholder="e.g. IOT-BIN-..." {...register("wb_sensor_id")} />
        <FieldError errors={[errors.wb_sensor_id]} />
      </Field>
    </div>
  );
}

export function PublicBuildingSpecsFields() {
  const { register, control, formState: { errors } } = useFormContext<AssetFormData>();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-6 gap-3">
      <Field className="sm:col-span-6" data-invalid={!!errors.pb_building_name}>
        <FieldLabel className="text-xs font-semibold">Facility Name</FieldLabel>
        <Input className="h-9 text-xs" {...register("pb_building_name")} />
        <FieldError errors={[errors.pb_building_name]} />
      </Field>

      <Field className="sm:col-span-3" data-invalid={!!errors.pb_building_type}>
        <FieldLabel className="text-xs font-semibold">Facility Usage Type</FieldLabel>
        <Controller
          name="pb_building_type"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Administrative Office" className="text-xs">Administrative Office</SelectItem>
                <SelectItem value="Health Center" className="text-xs">Health Center / Clinic</SelectItem>
                <SelectItem value="Community Hall" className="text-xs">Community Hall / Woreda Hub</SelectItem>
                <SelectItem value="Public School" className="text-xs">Public School</SelectItem>
                <SelectItem value="Fire Station" className="text-xs">Fire & Emergency Station</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={[errors.pb_building_type]} />
      </Field>

      <Field className="sm:col-span-3" data-invalid={!!errors.pb_construction_year}>
        <FieldLabel className="text-xs font-semibold">Year of Construction</FieldLabel>
        <Input type="number" className="h-9 text-xs" {...register("pb_construction_year")} />
        <FieldError errors={[errors.pb_construction_year]} />
      </Field>

      <Field className="sm:col-span-3" data-invalid={!!errors.pb_floors_count}>
        <FieldLabel className="text-xs font-semibold">Number of Floors (G+)</FieldLabel>
        <Input type="number" className="h-9 text-xs" {...register("pb_floors_count")} />
        <FieldError errors={[errors.pb_floors_count]} />
      </Field>
    </div>
  );
}
