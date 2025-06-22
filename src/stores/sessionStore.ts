import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SessionState {
  accessToken: string | null;
  refreshToken: string | null;
  userId: string | null;
  setSession: (accessToken: string, refreshToken: string, userId: string) => void;
  clearSession: () => void;
}

export const useSessionStore = create(
  persist<SessionState>(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      userId: null,
      setSession: (accessToken, refreshToken, userId) => set({ accessToken, refreshToken, userId }),
      clearSession: () => set({ accessToken: null, refreshToken: null, userId: null }),
    }),
    {
      name: 'session-storage',
    }
  )
);
