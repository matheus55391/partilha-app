import { useSessionStore } from "@/stores/sessionStore";

export function useLogout() {
  const clearSession = useSessionStore((state) => state.clearSession);
  return () => {
    clearSession();
  };
}
