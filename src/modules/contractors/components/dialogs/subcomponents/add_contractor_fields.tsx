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
import { Field, FieldLabel, FieldError } from "@/ui/field";
import { useDepartmentList } from "@/modules/departments/hooks/list/use_department_list";
import { useFormContext, Controller } from "react-hook-form";
import { AddContractorFormData } from "../../../types/contractor_schemas";

export function AddContractorFields() {
  const { data: departments } = useDepartmentList();
  const { register, control, watch, formState: { errors } } = useFormContext<AddContractorFormData>();
  const isContractor = watch("is_contractor");

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field data-invalid={!!errors.is_contractor}>
          <FieldLabel className="text-xs font-semibold">Entity Classification</FieldLabel>
          <Controller
            name="is_contractor"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value ? "contractor" : "staff"}
                onValueChange={(val) => field.onChange(val === "contractor")}
              >
                <SelectTrigger className="h-9 sm:h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="staff" className="text-xs">Internal Municipal Staff</SelectItem>
                  <SelectItem value="contractor" className="text-xs">External Contractor Entity</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <FieldError errors={[errors.is_contractor]} />
        </Field>

        <Field data-invalid={!!errors.department_id}>
          <FieldLabel className="text-xs font-semibold">Responsible Department</FieldLabel>
          <Controller
            name="department_id"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="h-9 sm:h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(departments || []).map((d) => (
                    <SelectItem key={d.id} value={d.id} className="text-xs">
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError errors={[errors.department_id]} />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field data-invalid={!!errors.name}>
          <FieldLabel className="text-xs font-semibold">Full Name / Lead Name</FieldLabel>
          <Input
            placeholder="e.g. Yared Haile"
            className="h-9 sm:h-8 text-xs"
            {...register("name")}
          />
          <FieldError errors={[errors.name]} />
        </Field>

        <Field data-invalid={!!errors.phone}>
          <FieldLabel className="text-xs font-semibold">Contact Phone</FieldLabel>
          <Input
            className="h-9 sm:h-8 text-xs"
            {...register("phone")}
          />
          <FieldError errors={[errors.phone]} />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field data-invalid={!!errors.email}>
          <FieldLabel className="text-xs font-semibold">Email Address</FieldLabel>
          <Input
            type="email"
            placeholder="engineer@company.com"
            className="h-9 sm:h-8 text-xs"
            {...register("email")}
          />
          <FieldError errors={[errors.email]} />
        </Field>

        <Field data-invalid={!!errors.position_title}>
          <FieldLabel className="text-xs font-semibold">Position Title</FieldLabel>
          <Input
            placeholder="e.g. Senior Electrical Engineer"
            className="h-9 sm:h-8 text-xs"
            {...register("position_title")}
          />
          <FieldError errors={[errors.position_title]} />
        </Field>
      </div>

      {isContractor && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-muted/20 rounded-lg border border-border">
          <Field data-invalid={!!errors.contractor_company_name}>
            <FieldLabel className="text-xs font-semibold">Contractor Company Name</FieldLabel>
            <Input
              placeholder="e.g. Blue Nile Electrical Works PLC"
              className="h-9 sm:h-8 text-xs bg-background"
              {...register("contractor_company_name")}
            />
            <FieldError errors={[errors.contractor_company_name]} />
          </Field>
          <Field data-invalid={!!errors.license_number}>
            <FieldLabel className="text-xs font-semibold">Trade License Number</FieldLabel>
            <Input
              placeholder="LIC-ETH-2026-..."
              className="h-9 sm:h-8 text-xs bg-background"
              {...register("license_number")}
            />
            <FieldError errors={[errors.license_number]} />
          </Field>
        </div>
      )}

      <Field data-invalid={!!errors.specialization}>
        <FieldLabel className="text-xs font-semibold">Technical Specialization / Equipment</FieldLabel>
        <Input
          placeholder="e.g. High Voltage, Transformer Feeds, 18m Crane Truck"
          className="h-9 sm:h-8 text-xs"
          {...register("specialization")}
        />
        <FieldError errors={[errors.specialization]} />
      </Field>
    </>
  );
}
