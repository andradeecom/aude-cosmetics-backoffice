import { SubHeader } from "@/components";
import { CreateProductForm } from "@/components/forms/create-product-form";
import { type CreateProductInFormSchema } from "./create-product-form-schema";
import { useMutation } from "@tanstack/react-query";
import { ProductService } from "@/services/product.service";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import type { BaseResponse, Product } from "@/types";

export const ProductCreatePage = () => {
  const navigate = useNavigate();
  const mutation = useMutation<BaseResponse<Product>, Error, CreateProductInFormSchema>({
    mutationFn: (values: CreateProductInFormSchema) => {
      return ProductService.create(values);
    },
    onSuccess: () => {
      toast.success("Product created successfully!");
      navigate("/dashboard/products");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (values: CreateProductInFormSchema) => {
    mutation.mutate(values);
  };

  return (
    <section className="space-y-6 py-10">
      <SubHeader title="New Product" />
      {mutation.isPending && <p>Loading...</p>}
      <CreateProductForm onSubmit={handleSubmit} />
    </section>
  );
};
