import { login, LoginPayload, LoginResponse } from "@/services/loginService";
import { useSessionStore } from "@/stores/sessionStore";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

export function useLoginMutation() {
  const setSession = useSessionStore((state) => state.setSession);
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: login,
    onSuccess: (data) => {
      setSession(data.refresh_token, data.access_token, "user_id");
      router.replace("/(protected)/home");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
}
