import { DataTable, columns } from "@/routes/dashboard/product-variants/list/table";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { ProductVariantService } from "@/services/product-variant.service";
import type { BaseResponse, ProductVariant } from "@/types";
import type { AxiosError } from "axios";

export const useProductVariantsList = () => {
  const navigate = useNavigate();

  const {
    data: variants,
    isPending,
    error,
  } = useQuery<BaseResponse<ProductVariant[]>, AxiosError>({
    queryKey: ["product-variants"],
    queryFn: ProductVariantService.findAll,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchInterval: 5 * 60 * 1000,
  });

  const variantsList = () => {
    if (isPending) {
      return <div>Loading...</div>;
    }

    if (error?.status === 404) {
      return <div>No products found!</div>;
    }

    return <DataTable columns={columns} data={variants?.data ?? []} />;
  };

  const navigateToCreateProductVariant = () => {
    navigate("/dashboard/product-variants/create");
  };

  return {
    variantsList,
    navigateToCreateProductVariant,
  };
};
