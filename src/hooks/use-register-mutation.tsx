import { register, RegisterPayload, RegisterResponse } from "@/services/register-service";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

interface UseRegisterMutationOptions {
  onError?: (error: Error) => void;
  onSuccess?: () => void;
}

export function useRegisterMutation(options?: UseRegisterMutationOptions) {
  // const setSession = useSessionStore((state) => state.setSession);
  return useMutation<RegisterResponse, Error, RegisterPayload>({
    mutationFn: async (data) => register(data),
    onSuccess: (data) => {
      options?.onSuccess?.();
      router.replace("/");
    },
    onError: (error) => {
      console.error("Register failed:", error);
      options?.onError?.(error);
    },
  });
}
