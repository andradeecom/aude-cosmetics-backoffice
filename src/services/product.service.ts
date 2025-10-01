import type { CreatProductInFormSchema } from "@/routes/dashboard/products/create/create-product-form-schema";
import api from "./api";

export const ProductService = {
  async create(product: CreatProductInFormSchema) {
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

  async update(id: string, product: CreatProductInFormSchema) {
    const response = await api.patch(`/api/products/${id}`, product);
    return response.data;
  },

  async delete(id: string) {
    const response = await api.delete(`/api/products/${id}`);
    return response.data;
  },
};
