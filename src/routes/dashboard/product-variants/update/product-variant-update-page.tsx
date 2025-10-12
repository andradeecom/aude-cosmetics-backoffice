import { SubHeader, UpdateVariantForm } from "@/components";
import { useMutation } from "@tanstack/react-query";
import { ProductVariantService } from "@/services/product-variant.service";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import type { UpdateProductVariantFormSchema } from "./update-product-variant-form-schema";
import type { BaseResponse, Product } from "@/types";
import { useParams } from "react-router";

export const ProductVariantUpdatePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const mutation = useMutation<BaseResponse<Product>, Error, UpdateProductVariantFormSchema>({
    mutationFn: (values: UpdateProductVariantFormSchema) => {
      return ProductVariantService.update(id!, values);
    },
    onSuccess: () => {
      toast.success("Product variant updated successfully!");
      navigate("/dashboard/product-variants");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (values: UpdateProductVariantFormSchema) => {
    mutation.mutate(values);
  };

  return (
    <section className="space-y-6 py-10">
      <SubHeader title="Update Variant" />
      <UpdateVariantForm onSubmit={handleSubmit} id={id!} />
    </section>
  );
};
