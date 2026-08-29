import { executeApiRequest } from "@/modules/shared/services/api_client";
import { INITIAL_MOCK_USERS } from "@/modules/users/hooks/list/user_list";
import {
  LoginInput,
  LoginResponse,
  LoginResponseSchema,
} from "../../types/auth_types";

export const AUTH_SESSION_QUERY_KEY = ["auth", "session"] as const;

export async function loginUser(input: LoginInput): Promise<LoginResponse> {
  return executeApiRequest({
    endpoint: "/auth/login/",
    method: "POST",
    body: input,
    outputSchema: LoginResponseSchema,
    mockFallback: () => {
      const existingUser = INITIAL_MOCK_USERS.find(
        (u) => u.email.toLowerCase() === input.email.toLowerCase()
      );

      const user = existingUser || {
        id: `usr-${Date.now()}`,
        first_name: input.email.split("@")[0].split(".")[0],
        last_name: input.email.split("@")[0].split(".")[1] || "User",
        email: input.email,
        role: "SYSTEM_ADMIN" as const,
        status: "ACTIVE" as const,
        department: { id: "dept-mock", name: "Mock Department", code: "MOCK" },
      };

      return {
        access: `mock-access-token-${Date.now()}`,
        refresh: `mock-refresh-token-${Date.now()}`,
        user,
      };
    },
  });
}
