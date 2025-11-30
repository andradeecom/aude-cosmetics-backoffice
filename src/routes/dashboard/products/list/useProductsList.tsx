import { DataTable, columns } from "@/routes/dashboard/products/list/table";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { ProductService } from "@/services/product.service";
import type { BaseResponse, Product } from "@/types";
import type { AxiosError } from "axios";

export const useProductsList = () => {
  const navigate = useNavigate();

  const {
    data: products,
    isPending,
    error,
  } = useQuery<BaseResponse<Product[]>, AxiosError>({
    queryKey: ["products"],
    queryFn: ProductService.findAll,
    select: (res) => res,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchInterval: 5 * 60 * 1000,
  });

  const productsList = () => {
    if (isPending) {
      return <div>Loading...</div>;
    }

    if (error?.status === 404) {
      return <div>No products found!</div>;
    }

    return <DataTable columns={columns} data={products?.data ?? []} />;
  };

  const navigateToCreateProduct = () => {
    navigate("/dashboard/products/create");
  };

  return {
    productsList,
    navigateToCreateProduct,
  };
};
