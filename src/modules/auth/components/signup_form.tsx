"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/ui/field";
import { Input } from "@/ui/input";
import { Alert, AlertDescription } from "@/ui/alert";
import {
  BuildingOfficeIcon,
  EnvelopeSimpleIcon,
  WarningCircleIcon,
  CircleNotchIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useSignup } from "../hooks/create/use_signup";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupFormData } from "../types/auth_schemas";

export function SignupForm({ className, ...props }: React.ComponentProps<typeof Card>) {
  const [formError, setFormError] = useState<string | null>(null);
  const signupMutation = useSignup();

  const methods = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      department_name: "",
      department_code: "",
      department_email: "",
      department_phone: "",
      address: "",
      representative_first_name: "",
      representative_last_name: "",
      representative_email: "",
      representative_phone: "",
      password: "",
      confirm_password: "",
      agree_terms: true as const,
    },
  });

  const { register, handleSubmit, formState: { errors } } = methods;

  const onSubmit = (data: SignupFormData) => {
    setFormError(null);

    signupMutation.mutate(
      {
        department_name: data.department_name,
        department_code: data.department_code,
        department_email: data.department_email,
        department_phone: data.department_phone,
        address: data.address,
        representative_first_name: data.representative_first_name,
        representative_last_name: data.representative_last_name,
        representative_email: data.representative_email,
        representative_phone: data.representative_phone,
        password: data.password,
      },
      {
        onError: (err) => {
          setFormError(err.message || "Failed to submit application. Please check your details.");
        },
      }
    );
  };

  return (
    <Card className={cn("border border-border/80 shadow-md", className)} {...props}>
      <CardHeader className="space-y-1 pb-3 text-center">
        <CardTitle className="text-xl font-bold tracking-tight">
          Register Department
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Submit a department registration application for the CIRP platform
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {formError && (
          <Alert variant="destructive" className="py-2 text-sm">
            <WarningCircleIcon className="size-4" />
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        )}

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <FieldGroup className="gap-3">
              <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider pt-2">
                Department Information
              </div>

              <div className="flex flex-col gap-3">
                <Field data-invalid={!!errors.department_name}>
                  <FieldLabel htmlFor="department_name" className="text-sm font-medium">
                    Department Name
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      id="department_name"
                      type="text"
                      placeholder="Roads Department"
                      className="text-sm pl-8"
                      {...register("department_name")}
                    />
                    <BuildingOfficeIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                  </div>
                  <FieldError errors={[errors.department_name]} />
                </Field>

                <Field data-invalid={!!errors.department_code}>
                  <FieldLabel htmlFor="department_code" className="text-sm font-medium">
                    Department Code
                  </FieldLabel>
                  <Input
                    id="department_code"
                    type="text"
                    placeholder="ROAD"
                    className="text-sm"
                    {...register("department_code")}
                  />
                  <FieldError errors={[errors.department_code]} />
                </Field>

                <Field data-invalid={!!errors.department_email}>
                  <FieldLabel htmlFor="department_email" className="text-sm font-medium">
                    Department Email
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      id="department_email"
                      type="email"
                      placeholder="roads@example.gov.et"
                      className="text-sm pl-8"
                      {...register("department_email")}
                    />
                    <EnvelopeSimpleIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                  </div>
                  <FieldError errors={[errors.department_email]} />
                </Field>

                <div className="grid grid-cols-2 gap-3">
                  <Field data-invalid={!!errors.department_phone}>
                    <FieldLabel htmlFor="department_phone" className="text-sm font-medium">
                      Phone
                    </FieldLabel>
                    <Input
                      id="department_phone"
                      type="tel"
                      placeholder="+251900000000"
                      className="text-sm"
                      {...register("department_phone")}
                    />
                    <FieldError errors={[errors.department_phone]} />
                  </Field>

                  <Field data-invalid={!!errors.address}>
                    <FieldLabel htmlFor="address" className="text-sm font-medium">
                      Address
                    </FieldLabel>
                    <Input
                      id="address"
                      type="text"
                      placeholder="Addis Ababa"
                      className="text-sm"
                      {...register("address")}
                    />
                    <FieldError errors={[errors.address]} />
                  </Field>
                </div>
              </div>

              <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider pt-2">
                Representative
              </div>

              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <Field data-invalid={!!errors.representative_first_name}>
                    <FieldLabel htmlFor="representative_first_name" className="text-sm font-medium">
                      First Name
                    </FieldLabel>
                    <Input
                      id="representative_first_name"
                      type="text"
                      placeholder="Abebe"
                      className="text-sm"
                      {...register("representative_first_name")}
                    />
                    <FieldError errors={[errors.representative_first_name]} />
                  </Field>

                  <Field data-invalid={!!errors.representative_last_name}>
                    <FieldLabel htmlFor="representative_last_name" className="text-sm font-medium">
                      Last Name
                    </FieldLabel>
                    <Input
                      id="representative_last_name"
                      type="text"
                      placeholder="Kebede"
                      className="text-sm"
                      {...register("representative_last_name")}
                    />
                    <FieldError errors={[errors.representative_last_name]} />
                  </Field>
                </div>

                <Field data-invalid={!!errors.representative_email}>
                  <FieldLabel htmlFor="representative_email" className="text-sm font-medium">
                    Representative Email
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      id="representative_email"
                      type="email"
                      placeholder="abebe@example.gov.et"
                      className="text-sm pl-8"
                      {...register("representative_email")}
                    />
                    <EnvelopeSimpleIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                  </div>
                  <FieldError errors={[errors.representative_email]} />
                </Field>

                <Field data-invalid={!!errors.representative_phone}>
                  <FieldLabel htmlFor="representative_phone" className="text-sm font-medium">
                    Representative Phone
                  </FieldLabel>
                  <Input
                    id="representative_phone"
                    type="tel"
                    placeholder="+251911111111"
                    className="text-sm"
                    {...register("representative_phone")}
                  />
                  <FieldError errors={[errors.representative_phone]} />
                </Field>
              </div>

              <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider pt-2">
                Account Password
              </div>

              <div className="flex flex-col gap-3">
                <Field data-invalid={!!errors.password}>
                  <FieldLabel htmlFor="password" className="text-sm font-medium">
                    Password
                  </FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Min 8 characters"
                    className="text-sm"
                    {...register("password")}
                  />
                  <FieldError errors={[errors.password]} />
                </Field>

                <Field data-invalid={!!errors.confirm_password}>
                  <FieldLabel htmlFor="confirm_password" className="text-sm font-medium">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    id="confirm_password"
                    type="password"
                    placeholder="Re-enter password"
                    className="text-sm"
                    {...register("confirm_password")}
                  />
                  <FieldError errors={[errors.confirm_password]} />
                </Field>
              </div>

              <Field className="pt-2">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full font-medium"
                  disabled={signupMutation.isPending}
                >
                  {signupMutation.isPending ? (
                    <span className="flex items-center gap-2">
                      <CircleNotchIcon className="size-4 animate-spin" />
                      Submitting Application...
                    </span>
                  ) : (
                    "Submit Department Application"
                  )}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </FormProvider>

        <div className="text-center pt-2 border-t border-border">
          <FieldDescription className="text-sm text-muted-foreground">
            Already have an active account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline underline-offset-4"
            >
              Sign in
            </Link>
          </FieldDescription>
        </div>
      </CardContent>
    </Card>
  );
}
