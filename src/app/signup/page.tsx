import React from "react";
import { Metadata } from "next";
import { SignupForm } from "@/modules/auth/components/signup_form";
import { AuthBrandHeader } from "@/modules/auth/components/subcomponents/auth_brand_header";
import { CIRPQueryProvider } from "@/modules/shared/components/query_provider";

export const metadata: Metadata = {
  title: "Sign Up - CIRP Municipal Platform",
  description: "Register for Civil Infrastructure & Reporting Platform",
};

export default function SignupPage() {
  return (
    <CIRPQueryProvider>
      <div className="flex min-h-svh w-full items-center justify-center p-4 md:p-8 bg-muted/20">
        <div className="w-full max-w-xl flex flex-col items-center">
          <AuthBrandHeader subtitle="Municipal Operations & Dispatch Onboarding" />
          <div className="w-full">
            <SignupForm />
          </div>
        </div>
      </div>
    </CIRPQueryProvider>
  );
}
