import axios, { AxiosError } from "axios";
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios";
import { getCookie } from "@/services/cookie";
import { eventBus, AUTH_EVENTS } from "@/services/events";

// Extend the request config to include our retry flag
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token to requests
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getCookie("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Flag to prevent multiple refresh attempts
let isRefreshing = false;

// Response interceptor for handling 401 errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;

    // Handle 401 errors (unauthorized) - token might be expired
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      // Prevent infinite loops
      originalRequest._retry = true;

      // If we're not already refreshing the token
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          // Import dynamically to avoid circular dependency
          const { AuthService } = await import("@/services/auth.service");
          
          // Attempt to refresh the token
          const refreshSuccess = await AuthService.refreshToken();

          if (refreshSuccess) {
            // Get the new token and retry the original request
            const newToken = getCookie("accessToken");
            if (originalRequest.headers && newToken) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }
            
            isRefreshing = false;
            return api(originalRequest);
          } else {
            // Refresh failed - emit session expired event
            isRefreshing = false;
            eventBus.emit(AUTH_EVENTS.SESSION_EXPIRED, { reason: "Token refresh failed" });
            return Promise.reject(error);
          }
        } catch {
          // Refresh threw an error
          isRefreshing = false;
          eventBus.emit(AUTH_EVENTS.SESSION_EXPIRED, { reason: "Token refresh error" });
          return Promise.reject(error);
        }
      } else {
        // Already refreshing, just reject this request
        return Promise.reject(error);
      }
    }

    // For all other errors, just reject the promise
    return Promise.reject(error);
  }
);

export default api;
