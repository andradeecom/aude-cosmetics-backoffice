import { DataTable, columns } from "@/routes/dashboard/product-variants/list/table";
import { SubHeader } from "@/components";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { ProductVariantService } from "@/services/product-variant.service";
import type { BaseResponse, ProductVariant } from "@/types";

export const ProductVariantsListPage = () => {
  const navigate = useNavigate();

  const {
    data: variants,
    isPending,
    error,
  } = useQuery<BaseResponse<ProductVariant[]>, Error, ProductVariant[]>({
    queryKey: ["variants"],
    queryFn: ProductVariantService.findAll,
    select: (res) => res.data,
  });

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="space-y-6 py-10">
      <SubHeader
        title="Product Variants"
        description="Manage the product variants"
        actions={
          <Button className="w-full cursor-pointer" onClick={() => navigate("/dashboard/product-variants/create")}>
            Create new variant
          </Button>
        }
      />
      <DataTable columns={columns} data={variants ?? []} />
    </section>
  );
};
