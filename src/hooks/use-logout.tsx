import { useSessionStore } from "@/stores/session-store";

export function useLogout() {
  const clearSession = useSessionStore((state) => state.clearSession);
  return () => {
    clearSession();
  };
}
