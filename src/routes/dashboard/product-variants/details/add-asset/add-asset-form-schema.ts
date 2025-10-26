import z from "zod";

export const AddAssetFormSchema = z.object({
  productVariantId: z.string().min(1, "Product Variant ID is required"),
  name: z.string().min(1, "Name is required"),
  alt: z.string().min(1, "Alt is required"),
  isPrimary: z.boolean(),
  file: z.file().refine((file) => file.size <= 1024 * 1024, {
    message: "File size must be less than 1MB",
  }),
});

export type AddAssetFormSchemaType = z.infer<typeof AddAssetFormSchema>;
