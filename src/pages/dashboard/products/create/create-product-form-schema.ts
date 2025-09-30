import { CATEGORY_TYPES, COLLECTION_TYPES, type Category, type Collection } from "@/types";
import z from "zod";

export const formSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  tags: z.array(z.string()),
  category: z.string().refine((value) => Object.values(CATEGORY_TYPES).includes(value as Category), {
    message: "Invalid category",
  }),
  collection: z.string().refine((value) => Object.values(COLLECTION_TYPES).includes(value as Collection), {
    message: "Invalid collection",
  }),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export type CreatProductInFormSchema = z.infer<typeof formSchema>;
