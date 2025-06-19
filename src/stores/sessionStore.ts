import { create } from 'zustand';

interface SessionState {
  accessToken: string | null;
  refreshToken: string | null;
  userId: string | null;
  setSession: (accessToken: string, refreshToken: string, userId: string) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  accessToken: null,
  refreshToken: null,
  userId: null,
  setSession: (accessToken, refreshToken, userId) => set({ accessToken, refreshToken, userId }),
  clearSession: () => set({ accessToken: null, refreshToken: null, userId: null }),
}));
