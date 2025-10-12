import api from "./api";
import type { CreateProductVariantFormSchema } from "@/routes/dashboard/product-variants/create/create-product-variant-form-schema";
import type { UpdateProductVariantFormSchema } from "@/routes/dashboard/product-variants/update/update-product-variant-form-schema";

export const ProductVariantService = {
  async create(product: CreateProductVariantFormSchema) {
    const response = await api.post("/api/product-variants", product);
    return response.data;
  },

  async findAll() {
    const response = await api.get("/api/product-variants");
    return response.data;
  },

  async findById(id: string) {
    const response = await api.get(`/api/product-variants/${id}`);
    return response.data;
  },

  async update(id: string, product: UpdateProductVariantFormSchema) {
    const response = await api.patch(`/api/product-variants/${id}`, product);
    return response.data;
  },

  async delete(id: string) {
    const response = await api.delete(`/api/product-variants/${id}`);
    return response.data;
  },
};
