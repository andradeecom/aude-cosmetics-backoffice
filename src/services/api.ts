import axios, { AxiosError } from "axios";
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios";
import { getCookie } from "@/services/cookie";
import { eventBus, AUTH_EVENTS } from "@/services/events";

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

// Flag to prevent multiple refresh token requests
let isRefreshing = false;
// Store pending requests that should be retried after token refresh
let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: Error | unknown) => void }[] = [];

// Process the failed queue (either resolve or reject all pending requests)
const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401 && originalRequest && !originalRequest.headers["X-Retry"]) {
      // If we're not already refreshing the token
      if (!isRefreshing) {
        isRefreshing = true;

        // Import dynamically to avoid circular dependency
        const { AuthService } = await import("@/services/auth.service");

        try {
          // Attempt to refresh the token
          const refreshSuccess = await AuthService.refreshToken();

          if (refreshSuccess) {
            // Mark this request as retried to prevent infinite loop
            if (originalRequest.headers) {
              originalRequest.headers["X-Retry"] = "true";
            }

            // Get the new token
            const newToken = getCookie("accessToken");

            // Update Authorization header with new token
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }

            // Process all queued requests with the new token
            processQueue(null, newToken);

            // Retry the original request
            return axios(originalRequest);
          } else {
            // If refresh failed, reject all queued requests
            processQueue(new Error("Failed to refresh token"));

            // Emit session expired event
            eventBus.emit(AUTH_EVENTS.SESSION_EXPIRED, { reason: "Token refresh failed" });

            return Promise.reject(error);
          }
        } catch (refreshError) {
          // If refresh throws an error, reject all queued requests
          processQueue(new Error("Failed to refresh token"));

          // Emit session expired event
          eventBus.emit(AUTH_EVENTS.SESSION_EXPIRED, { reason: "Token refresh error", error: refreshError });

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      } else {
        // If we're already refreshing, add this request to the queue
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            // When the token is refreshed, retry the original request with the new token
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return axios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }
    }

    // For all other errors, just reject the promise
    return Promise.reject(error);
  }
);

export default api;
