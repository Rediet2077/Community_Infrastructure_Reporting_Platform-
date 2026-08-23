"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { useDepartmentList } from "../hooks/list/use_department_list";
import { useDepartmentUIStore } from "../store/department_ui_store";
import { DepartmentProfileDialog } from "./dialogs/department_profile_dialog";

export function DepartmentsView() {
  const { data: departments, isLoading } = useDepartmentList();
  const { isProfileDialogOpen, openProfileDialog } = useDepartmentUIStore();

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 w-full">
        <div className="animate-pulse flex flex-col gap-4">
          <div className="h-10 bg-muted/30 rounded w-1/3" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-48 bg-muted/20 rounded-xl border border-border" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const deptList = departments || [];

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Municipal Departments & Authorities
          </h1>
          <p className="text-sm font-normal text-muted-foreground mt-1">
            Departmental operational performance, responsible infrastructure taxonomy, asset counts, and resolution compliance.
          </p>
        </div>

        <Badge variant="outline" className="text-sm font-normal py-0.5 px-2.5 text-muted-foreground">
          {deptList.length} Municipal Departments
        </Badge>
      </div>

      {/* Departments Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {deptList.map((dept) => (
          <Card
            key={dept.id}
            className="hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => openProfileDialog(dept.id)}
          >
              <CardHeader>
                <CardTitle>{dept.name}</CardTitle>
                <CardDescription className="line-clamp-2 leading-relaxed">
                  {dept.description}
                </CardDescription>
                <CardAction>
                  <Badge variant="outline" className="text-sm font-normal">
                    {dept.code}
                  </Badge>
                </CardAction>
              </CardHeader>

              <CardContent className="flex flex-col gap-4 flex-1">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase block mb-1">
                      Assets In DB
                    </span>
                    <span className="font-semibold text-foreground">
                      {dept.total_assets.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase block mb-1">
                      Resolution Rate
                    </span>
                    <span className="font-semibold text-foreground">
                      {dept.resolution_rate_percent}%
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    Active Tasks: <span className="text-foreground font-medium">{dept.active_tasks}</span>
                  </span>
                  {dept.overdue_tasks > 0 ? (
                    <span className="font-medium text-destructive">{dept.overdue_tasks} Overdue</span>
                  ) : (
                    <span className="text-foreground font-normal">0 Overdue</span>
                  )}
                </div>
              </CardContent>

            <CardFooter className="p-0">
              <Button
                variant="ghost"
                className="w-full h-11 rounded-none text-sm font-normal text-muted-foreground hover:text-foreground hover:bg-transparent"
                onClick={(e) => {
                  e.stopPropagation();
                  openProfileDialog(dept.id);
                }}
              >
                Inspect Department Profile
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Department Profile Modal */}
      {isProfileDialogOpen && <DepartmentProfileDialog />}
    </div>
  );
}
