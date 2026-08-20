"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signupUser, AUTH_SIGNUP_QUERY_KEY } from "./signup";
import { SignupInput, SignupResponse } from "../../types/auth_types";
import { AUTH_SESSION_QUERY_KEY } from "./login";

export function useSignup() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<SignupResponse, Error, SignupInput>({
    mutationFn: (input: SignupInput) => signupUser(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUTH_SIGNUP_QUERY_KEY });
      router.push("/login");
    },
  });
}
