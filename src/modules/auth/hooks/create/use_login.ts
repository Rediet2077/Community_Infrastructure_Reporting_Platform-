"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginUser, AUTH_SESSION_QUERY_KEY } from "./login";
import { LoginInput, LoginResponse } from "../../types/auth_types";
import { useNavigationStore } from "@/modules/shared/store/navigation_store";
import { localStorageService } from "@/modules/shared/services/local_storage";

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setCurrentUserRole, setActiveOfficerDepartmentId } = useNavigationStore();

  return useMutation<LoginResponse, Error, LoginInput>({
    mutationFn: (input: LoginInput) => loginUser(input),
    onSuccess: (data) => {
      if (data.user.role === "SYSTEM_ADMIN" || data.user.role === "DEPARTMENT_ADMIN") {
        setCurrentUserRole(data.user.role);
      }

      if (data.user.department) {
        setActiveOfficerDepartmentId(data.user.department.id);
      }

      queryClient.setQueryData(AUTH_SESSION_QUERY_KEY, data);
      localStorageService.setItem("authSession", data);
      queryClient.invalidateQueries({ queryKey: ["users", "list"] });
      router.push("/dashboard");
    },
  });
}
