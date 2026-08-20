"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Card } from "@/ui/card";
import {
  MagnifyingGlassIcon,
  DotsThreeVerticalIcon,
} from "@phosphor-icons/react";
import { UserRecord, SystemUserRole } from "../types/user_types";

interface UsersTableProps {
  users: UserRecord[];
}

export function UsersTable({ users }: UsersTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      `${u.first_name} ${u.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.department?.name && u.department.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesRole = roleFilter === "ALL" || u.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role: SystemUserRole) => {
    switch (role) {
      case "SYSTEM_ADMIN":
        return <Badge className="bg-primary/15 text-primary hover:bg-primary/25 border-primary/30 text-sm font-normal py-0.5">System Admin</Badge>;
      case "DEPARTMENT_ADMIN":
        return <Badge variant="secondary" className="text-sm font-normal py-0.5">Department Admin</Badge>;
      default:
        return <Badge variant="outline" className="text-sm font-normal py-0.5">{role}</Badge>;
    }
  };

  return (
    <Card className="border-border bg-card overflow-hidden">
      {/* Controls Bar */}
      <div className="p-3 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-muted/20">
        <div className="relative flex-1 max-w-sm">
          <MagnifyingGlassIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name, email, department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9 pl-8 text-sm font-normal bg-background"
          />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {          ["ALL", "SYSTEM_ADMIN", "DEPARTMENT_ADMIN"].map(
            (role) => (
              <Button
                key={role}
                variant={roleFilter === role ? "default" : "outline"}
                size="sm"
                onClick={() => setRoleFilter(role)}
                className="h-8 text-sm font-normal px-3"
              >
                {role === "ALL" ? "All Roles" : role.replace("_", " ").toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}
              </Button>
            )
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Name</TableHead>
              <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Email</TableHead>
              <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Phone</TableHead>
              <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Role</TableHead>
              <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Department</TableHead>
              <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Status</TableHead>
              <TableHead className="text-sm font-medium uppercase tracking-wider text-right text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-sm font-normal text-muted-foreground">
                  No users found matching your search criteria.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-border hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium text-sm text-foreground">
                    {user.first_name} {user.last_name}
                  </TableCell>
                  <TableCell className="text-sm font-normal text-muted-foreground">
                    {user.email}
                  </TableCell>
                  <TableCell className="text-sm font-normal text-muted-foreground whitespace-nowrap">
                    —
                  </TableCell>
                  <TableCell>
                    {getRoleBadge(user.role)}
                  </TableCell>
                  <TableCell className="text-sm font-normal text-muted-foreground">
                    {user.department?.name || "General System"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.status === "ACTIVE" ? "default" : "outline"}
                      className={`text-sm font-normal px-2.5 py-0.5 ${
                        user.status === "ACTIVE"
                          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                          : ""
                      }`}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon-sm" className="h-8 w-8">
                      <DotsThreeVerticalIcon className="size-4 text-muted-foreground" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
