import type { BaseModel, ProductImage, Product } from "@/types";
import type { ProductVariantInventory } from "./product-variant-inventory";

export interface ProductVariant extends BaseModel {
  name: string;
  // sku: string;
  price: number;
  images: ProductImage[];
  // stock: number;
  isActive: boolean;

  productId: string;
  product?: Product;

  inventory: ProductVariantInventory;
}
