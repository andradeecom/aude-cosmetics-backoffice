import type { UserSignInResponse } from "@/types";

export interface SignInResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    user: UserSignInResponse;
  };
  message: string;
  status: string;
}
