import { SubHeader } from "@/components";
import { AddAssetForm } from "@/components";
import { type AddAssetFormSchemaType } from "./add-asset-form-schema";
import { useMutation } from "@tanstack/react-query";
import { AddAssetService } from "@/services";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import type { BaseResponse, ProductVariant } from "@/types";

export const AddAssetPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const mutation = useMutation<BaseResponse<ProductVariant>, Error, AddAssetFormSchemaType>({
    mutationFn: (values: AddAssetFormSchemaType) => {
      return AddAssetService.upload(values);
    },
    onSuccess: () => {
      toast.success("Image added successfully!");
      navigate(`/dashboard/product-variants/${id}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (values: AddAssetFormSchemaType) => {
    mutation.mutate(values);
  };

  return (
    <section className="space-y-6 py-10">
      <SubHeader title="Upload Image" />
      {mutation.isPending && <p>Loading...</p>}
      <AddAssetForm onSubmit={handleSubmit} variantId={id!} />
    </section>
  );
};
