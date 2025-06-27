import api from "@/lib/axios";

export interface RefreshPayload {
  userId: string;
  refreshToken: string;
}

export interface RefreshResponse {
  access_token: string;
}

export const refreshToken = async (payload: RefreshPayload): Promise<RefreshResponse> => {
  const { data } = await api.post<RefreshResponse>('/auth/refresh', payload);
  return data;
};
