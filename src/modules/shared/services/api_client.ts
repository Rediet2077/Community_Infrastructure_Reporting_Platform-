import { createFetch } from "@better-fetch/fetch";
import { z } from "zod";
import { localStorageService } from "./local_storage";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined" ? window.location.origin + "/api/v1" : "/api/v1");

interface AuthSession {
  access: string;
  refresh: string;
}

function getAuthToken(): string | undefined {
  const session = localStorageService.getItem<AuthSession>("authSession");
  return session?.access;
}

const betterFetchClient = createFetch({
  baseURL: API_BASE_URL,
  retry: {
    type: "linear",
    attempts: 1,
    delay: 500,
  },
});

export async function executeApiRequest<T>(options: {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined>;
  outputSchema: z.ZodType<T>;
  mockFallback?: () => T | Promise<T>;
}): Promise<T> {
  const { endpoint, method = "GET", body, query, outputSchema, mockFallback } = options;

  const hasConfiguredExternalApi = Boolean(
    process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL.length > 0
  );

  if (hasConfiguredExternalApi) {
    try {
      const token = getAuthToken();
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await betterFetchClient<T>(endpoint, {
        method,
        body: body ? JSON.stringify(body) : undefined,
        query: query as Record<string, string>,
        headers,
        throw: true,
        output: outputSchema,
      });

      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.warn(`[BetterFetch] Remote API error on ${endpoint}. Falling back to local store.`, error);
    }
  }

  if (mockFallback) {
    const fallbackResult = await mockFallback();
    return outputSchema.parse(fallbackResult);
  }

  throw new Error(`API endpoint ${endpoint} failed and no fallback was provided.`);
}
