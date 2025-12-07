import { axiosInstance } from "@/lib/axios";
import { LoginCredentials, SignupCredentials, User } from "@/types";

export interface AuthApiResponse {
  success: boolean;
  user: User;
  token: string;
  error?: string;
}

interface GetMeResponse {
  success: boolean;
  user: User;
}

export const authApi = {
  signup: async (credentials: SignupCredentials): Promise<AuthApiResponse> => {
    const response = await axiosInstance.post<AuthApiResponse>(
      "/api/auth/signup",
      credentials
    );
    return response.data;
  },

  login: async (credentials: LoginCredentials): Promise<AuthApiResponse> => {
    const response = await axiosInstance.post<AuthApiResponse>(
      "/api/auth/login",
      credentials
    );
    return response.data;
  },

  logout: async (): Promise<void> => {
    await axiosInstance.post("/api/auth/logout");
  },

  me: async (): Promise<User> => {
    const response = await axiosInstance.get<GetMeResponse>("/api/auth/me");
    return response.data.user;
  },
};
