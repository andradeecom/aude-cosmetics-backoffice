import api from "./api";
import type { AddAssetFormSchemaType } from "@/routes/dashboard/product-variants/details/add-asset";

export const AddAssetService = {
  async upload(values: AddAssetFormSchemaType) {
    if (!values.file) {
      throw new Error("No file provided for upload");
    }

    const response = await api.post("/api/assets/upload", values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  async delete(id: string) {
    const response = await api.delete(`/api/assets/${id}`);
    return response.data;
  },
};
