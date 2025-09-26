import type { BaseModel, ProductVariant } from "@/types";

export interface ProductImage extends BaseModel {
  objectKey: string;
  name: string;
  alt?: string;
  type: AcceptedMimeTypes;
  size: number;
  url: string;
  isPrimary: boolean;

  productVariant?: ProductVariant;
}

export type AcceptedMimeTypes = "type/jpg" | "type/png" | "type/gif" | "type/webp";
