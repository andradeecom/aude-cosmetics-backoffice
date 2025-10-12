import { SubHeader, UpdateProductForm } from "@/components";
import { useMutation } from "@tanstack/react-query";
import { ProductService } from "@/services/product.service";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import type { UpdateProductInFormSchema } from "./update-product-form-schema";
import type { BaseResponse, Product } from "@/types";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";

export const ProductUpdatePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const mutation = useMutation<BaseResponse<Product>, Error, UpdateProductInFormSchema>({
    mutationFn: (values: UpdateProductInFormSchema) => {
      return ProductService.update(id!, values);
    },
    onSuccess: () => {
      toast.success("Product updated successfully!", {
        action: <Button onClick={() => navigate("/dashboard/products")}>Go to products</Button>,
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (values: UpdateProductInFormSchema) => {
    mutation.mutate(values);
  };

  return (
    <section className="space-y-6 py-10">
      <SubHeader title="Update Product" />
      <UpdateProductForm onSubmit={handleSubmit} id={id!} />
    </section>
  );
};
