import type { BaseModel } from "./common/base-model";

export interface ProductVariantInventory extends BaseModel {
  quantity: number;
  productVariantId: string;
}
