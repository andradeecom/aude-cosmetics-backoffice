import { AxiosError } from "axios";
import api from "@/services/api";
import { setCookie, removeCookie } from "@/services/cookie";
import type { SignInResponse } from "@/routes/auth/sign-in/sign-in-response";
import { eventBus, AUTH_EVENTS } from "@/services/events";
import type { ErrorResponse, UserSignInResponse } from "@/types";

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthResult {
  success: boolean;
  user?: UserSignInResponse;
  error?: string;
}

const TOKEN_EXPIRY = import.meta.env.VITE_TOKEN_EXPIRY || 7; // days
const REFRESH_TOKEN_EXPIRY = import.meta.env.VITE_REFRESH_TOKEN_EXPIRY || 30; // days

export const AuthService = {
  /**
   * Sign in a user with email and password
   * @param credentials User credentials
   * @returns AuthResult with success status, user data if successful, or error message
   */
  async signIn(credentials: SignInCredentials): Promise<AuthResult> {
    try {
      const response = await api.post<SignInResponse>("/api/auth/sign-in", credentials);

      const { accessToken, refreshToken, user } = response.data.data;

      // Store tokens in cookies (httpOnly would be better but requires server)
      setCookie("accessToken", accessToken, TOKEN_EXPIRY);
      setCookie("refreshToken", refreshToken, REFRESH_TOKEN_EXPIRY);

      // Emit logged in event
      eventBus.emit(AUTH_EVENTS.LOGGED_IN, { user });

      return {
        success: true,
        user,
      };
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      return {
        success: false,
        error: axiosError.response?.data?.message || "Failed to sign in. Please try again.",
      };
    }
  },

  /**
   * Sign out the current user
   */
  signOut(): void {
    // Remove tokens from cookies
    removeCookie("accessToken");
    removeCookie("refreshToken");

    // Emit logged out event
    eventBus.emit(AUTH_EVENTS.LOGGED_OUT);
  },

  /**
   * Check if user is authenticated based on token existence
   */
  isAuthenticated(): boolean {
    const token = document.cookie.split("; ").find((row) => row.startsWith("accessToken="));
    return !!token;
  },

  /**
   * Refresh the access token using the refresh token
   * @returns Promise<boolean> indicating success or failure
   */
  async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("refreshToken="))
        ?.split("=")[1];

      if (!refreshToken) {
        return false;
      }

      const response = await api.post<{ accessToken: string }>("/api/auth/refresh-token", {
        refreshToken,
      });

      if (response.data.accessToken) {
        setCookie("accessToken", response.data.accessToken, TOKEN_EXPIRY);
        return true;
      }

      return false;
    } catch {
      return false;
    }
  },
};
