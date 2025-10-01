import { SubHeader } from "@/components";
import { CreateProductForm } from "@/components/CreateProductForm";
import { type CreatProductInFormSchema } from "./create-product-form-schema";
import { useMutation } from "@tanstack/react-query";
import { ProductService } from "@/services/product.service";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import type { BaseResponse, Product } from "@/types";

export default function ProductCreatePage() {
  const navigate = useNavigate();
  const mutation = useMutation<BaseResponse<Product>, Error, CreatProductInFormSchema>({
    mutationFn: (values: CreatProductInFormSchema) => {
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

  const handleSubmit = (values: CreatProductInFormSchema) => {
    mutation.mutate(values);
  };

  return (
    <section className="space-y-6 py-10">
      <SubHeader title="New Product" />
      <CreateProductForm onSubmit={handleSubmit} />
    </section>
  );
}
