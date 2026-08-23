import React from "react";
import { SidebarInset, SidebarProvider } from "@/ui/sidebar";
import { CIRPQueryProvider } from "@/modules/shared/components/query_provider";
import { AppSidebar } from "@/modules/shared/components/app_sidebar";
import { TopNavbar } from "@/modules/shared/components/top_navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CIRPQueryProvider>
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <SidebarInset className="bg-background min-h-screen flex flex-col">
          <TopNavbar />
          <main className="flex-1 flex flex-col">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </CIRPQueryProvider>
  );
}
