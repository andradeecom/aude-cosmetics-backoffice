import { PASSWORD_PATTERN } from "@/utils/validation-patterns";
import z from "zod";

export const formSchema = z.object({
  email: z.email(),
  password: z.string().regex(PASSWORD_PATTERN),
});

export type SignInFormSchema = z.infer<typeof formSchema>;
