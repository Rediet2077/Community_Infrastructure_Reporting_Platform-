import { executeApiRequest } from "@/modules/shared/services/api_client";
import {
  SignupInput,
  SignupResponse,
  SignupResponseSchema,
} from "../../types/auth_types";

export const AUTH_SIGNUP_QUERY_KEY = ["auth", "signup"] as const;

export async function signupUser(input: SignupInput): Promise<SignupResponse> {
  return executeApiRequest({
    endpoint: "/departments/apply/",
    method: "POST",
    body: input,
    outputSchema: SignupResponseSchema,
    mockFallback: () => ({
      message: "Department application submitted successfully. Awaiting approval.",
    }),
  });
}
