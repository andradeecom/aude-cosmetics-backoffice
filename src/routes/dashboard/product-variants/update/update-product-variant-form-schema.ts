import z from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number(),
  productId: z.string().min(1, "Product ID is required"),
  isActive: z.boolean(),
});

export type UpdateProductVariantFormSchema = z.infer<typeof formSchema>;
