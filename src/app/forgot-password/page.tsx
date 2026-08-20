import React from "react";
import { Metadata } from "next";
import { ForgotPasswordForm } from "@/modules/auth/components/forgot_password_form";
import { AuthBrandHeader } from "@/modules/auth/components/subcomponents/auth_brand_header";

export const metadata: Metadata = {
  title: "Reset Password - CIRP Municipal Platform",
  description: "Reset your password for the Civil Infrastructure & Reporting Platform",
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-4 md:p-8 bg-muted/20">
      <div className="w-full max-w-md flex flex-col items-center">
        <AuthBrandHeader subtitle="Municipal Asset & Maintenance Platform" />
        <div className="w-full">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
