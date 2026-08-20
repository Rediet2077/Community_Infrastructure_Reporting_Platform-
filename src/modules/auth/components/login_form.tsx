"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
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
import { LockKeyIcon, EnvelopeSimpleIcon, WarningCircleIcon, CircleNotchIcon } from "@phosphor-icons/react";
import { useLogin } from "../hooks/create/use_login";
import { DemoAccountSwitcher } from "./subcomponents/demo_account_switcher";
import { DemoAccountPreset } from "../types/auth_types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "../types/auth_schemas";

interface LoginFormProps extends React.ComponentProps<"div"> {
  className?: string;
}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const [formError, setFormError] = useState<string | null>(null);
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "dawit.tadesse@cirp.gov.et",
      password: "password123",
    },
  });

  const watchEmail = watch("email");

  const handleSelectPreset = (preset: DemoAccountPreset) => {
    setValue("email", preset.email);
    setValue("password", "password123");
    setFormError(null);
  };

  const onSubmit = (data: LoginFormData) => {
    setFormError(null);

    loginMutation.mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onError: (err) => {
          setFormError(err.message || "Failed to sign in. Please verify your credentials.");
        },
      }
    );
  };

  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <Card className="border border-border/80 shadow-md">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-xl font-bold tracking-tight text-center">
            Sign In to CIRP
          </CardTitle>
          <CardDescription className="text-center text-sm text-muted-foreground">
            Access municipal infrastructure, asset registries & dispatched tasks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {formError && (
            <Alert variant="destructive" className="py-2 text-sm">
              <WarningCircleIcon className="size-4" />
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FieldGroup className="gap-3">
              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email" className="text-sm font-medium">
                  Official Email Address
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="officer@cirp.gov.et"
                    className="text-sm pl-8"
                    {...register("email")}
                  />
                  <EnvelopeSimpleIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                </div>
                <FieldError errors={[errors.email]} />
              </Field>

              <Field data-invalid={!!errors.password}>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password" className="text-sm font-medium">
                    Password
                  </FieldLabel>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary underline-offset-4 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    className="text-sm pl-8"
                    {...register("password")}
                  />
                  <LockKeyIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                </div>
                <FieldError errors={[errors.password]} />
              </Field>

              <Field className="pt-1">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full font-medium"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? (
                    <span className="flex items-center gap-2">
                      <CircleNotchIcon className="size-4 animate-spin" />
                      Authenticating...
                    </span>
                  ) : (
                    "Sign In to Dashboard"
                  )}
                </Button>
              </Field>
            </FieldGroup>
          </form>

          <DemoAccountSwitcher
            onSelectPreset={handleSelectPreset}
            selectedEmail={watchEmail}
          />

          <div className="text-center pt-1 border-t border-border">
            <FieldDescription className="text-sm text-muted-foreground">
              New municipal employee or contractor?{" "}
              <Link
                href="/signup"
                className="font-medium text-primary hover:underline underline-offset-4"
              >
                Register an account
              </Link>
            </FieldDescription>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}