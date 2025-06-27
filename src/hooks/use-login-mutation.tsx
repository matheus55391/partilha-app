import { login, LoginPayload, LoginResponse } from "@/services/login-service";
import { useSessionStore } from "@/stores/session-store";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

interface UseLoginMutationOptions {
  onError?: (error: Error) => void;
}

export function useLoginMutation(options?: UseLoginMutationOptions) {
  const setSession = useSessionStore((state) => state.setSession);
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: login,
    onSuccess: (data) => {
      setSession(data.refresh_token, data.access_token, "user_id");
      router.replace("/(protected)/home");
    },
    onError: (error) => {
      console.error("Login failed:", error);
      options?.onError?.(error);
    },
  });
}
