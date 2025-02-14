import { axiosInstance } from "./axios";
import {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
} from "../types/auth";

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const formData = new URLSearchParams();
    formData.append("username", credentials.username);
    formData.append("password", credentials.password);

    const response = await axiosInstance.post<AuthResponse>(
      "/auth/login",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data;
  },

  register: async (credentials: RegisterCredentials) => {
    const response = await axiosInstance.post("/auth/register", credentials);
    return response.data;
  },
};
