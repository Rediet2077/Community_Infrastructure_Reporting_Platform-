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
import { EnvelopeSimpleIcon, WarningCircleIcon, CircleNotchIcon, CheckCircleIcon } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, ForgotPasswordFormData } from "../types/auth_schemas";

interface ForgotPasswordFormProps extends React.ComponentProps<"div"> {
  className?: string;
}

export function ForgotPasswordForm({ className, ...props }: ForgotPasswordFormProps) {
  const [formError, setFormError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setFormError(null);
    setIsPending(true);

    // Simulate API call for forgot password
    setTimeout(() => {
      setIsPending(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <Card className="border border-border/80 shadow-md">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-xl font-bold tracking-tight text-center">
            Reset Password
          </CardTitle>
          <CardDescription className="text-center text-sm text-muted-foreground">
            Enter your official municipal email address and we'll send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {formError && (
            <Alert variant="destructive" className="py-2 text-sm">
              <WarningCircleIcon className="size-4" />
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}

          {isSuccess ? (
            <Alert className="py-3 text-sm bg-primary/10 text-primary border-primary/20">
              <CheckCircleIcon className="size-5" />
              <AlertDescription className="ml-2">
                Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.
              </AlertDescription>
            </Alert>
          ) : (
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

                <Field className="pt-1">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full font-medium"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <span className="flex items-center gap-2">
                        <CircleNotchIcon className="size-4 animate-spin" />
                        Sending Reset Link...
                      </span>
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          )}

          <div className="text-center pt-2 border-t border-border mt-4">
            <FieldDescription className="text-sm text-muted-foreground">
              Remember your password?{" "}
              <Link
                href="/login"
                className="font-medium text-primary hover:underline underline-offset-4"
              >
                Return to Sign In
              </Link>
            </FieldDescription>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
