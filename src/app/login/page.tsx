import React from "react";
import { Metadata } from "next";
import { LoginForm } from "@/modules/auth/components/login_form";
import { AuthBrandHeader } from "@/modules/auth/components/subcomponents/auth_brand_header";
import { CIRPQueryProvider } from "@/modules/shared/components/query_provider";

export const metadata: Metadata = {
  title: "Sign In - CIRP Municipal Platform",
  description: "Sign in to Civil Infrastructure & Reporting Platform",
};

export default function LoginPage() {
  return (
    <CIRPQueryProvider>
      <div className="flex min-h-svh w-full items-center justify-center p-4 md:p-8 bg-muted/20">
        <div className="w-full max-w-md flex flex-col items-center">
          <AuthBrandHeader subtitle="Municipal Asset & Maintenance Platform" />
          <div className="w-full">
            <LoginForm />
          </div>
        </div>
      </div>
    </CIRPQueryProvider>
  );
}
