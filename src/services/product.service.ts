import api from "./api";
import type { CreateProductInFormSchema } from "@/routes/dashboard/products/create/create-product-form-schema";
import type { UpdateProductInFormSchema } from "@/routes/dashboard/products/update/update-product-form-schema";

export const ProductService = {
  async create(product: CreateProductInFormSchema) {
    const response = await api.post("/api/products", product);
    return response.data;
  },

  async findAll() {
    const response = await api.get("/api/products");
    return response.data;
  },

  async findById(id: string) {
    const response = await api.get(`/api/products/${id}`);
    return response.data;
  },

  async update(id: string, product: UpdateProductInFormSchema) {
    const response = await api.patch(`/api/products/${id}`, product);
    return response.data;
  },

  async delete(id: string) {
    const response = await api.delete(`/api/products/${id}`);
    return response.data;
  },
};
