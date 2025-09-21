import z from "zod";

export const formSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export type SignInFormSchema = z.infer<typeof formSchema>;
