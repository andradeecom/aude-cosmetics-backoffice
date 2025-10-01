import { PASSWORD_PATTERN } from "@/lib/constants";
import z from "zod";

export const formSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .regex(
      PASSWORD_PATTERN,
      "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
});

export type SignInFormSchema = z.infer<typeof formSchema>;
