import { SubHeader } from "@/components";
import { CreateVariantForm } from "@/components/create-variant-form";
import { type CreateProductVariantFormSchema } from "./create-product-variant-form-schema";
import { useMutation } from "@tanstack/react-query";
import { ProductVariantService } from "@/services/product-variant.service";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import type { BaseResponse, ProductVariant } from "@/types";

export const ProductVariantCreatePage = () => {
  const navigate = useNavigate();
  const mutation = useMutation<BaseResponse<ProductVariant>, Error, CreateProductVariantFormSchema>({
    mutationFn: (values: CreateProductVariantFormSchema) => {
      return ProductVariantService.create(values);
    },
    onSuccess: () => {
      toast.success("Product variant created successfully!");
      navigate("/dashboard/product-variants");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (values: CreateProductVariantFormSchema) => {
    mutation.mutate(values);
  };

  return (
    <section className="space-y-6 py-10">
      <SubHeader title="New Product Variant" />
      {mutation.isPending && <p>Loading...</p>}
      <CreateVariantForm onSubmit={handleSubmit} />
    </section>
  );
};
