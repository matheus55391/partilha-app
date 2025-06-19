import { register, RegisterPayload, RegisterResponse } from "@/services/registerService";
import { useSessionStore } from "@/stores/sessionStore";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

export function useRegisterMutation() {
  const setSession = useSessionStore((state) => state.setSession);
  return useMutation<RegisterResponse, Error, RegisterPayload>({
    mutationFn: async (data) => register(data),
    onSuccess: (data) => {
      router.replace("/login"); 
    },
    onError: (error) => {
      console.error("Register failed:", error);
    },
  });
}
