import type { BaseModel, Category, Collection, ProductVariant } from "@/types";

export interface Product extends BaseModel {
  name: string;
  description?: string;
  tags: string[];
  category: Category;
  collection: Collection;
  seoTitle?: string;
  seoDescription?: string;

  variants?: ProductVariant[];
}
