import api from "@/lib/axios";

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}

export interface RegisterResponse {
  id: string;
  email: string;
  name: string;
}

export const register = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  const { data } = await api.post<RegisterResponse>('/auth/register', payload);
  return data;
};
