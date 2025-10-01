import { DataTable } from "@/routes/dashboard/products/DataTable";
import { columns } from "./Columns";
import { SubHeader } from "@/components";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { ProductService } from "@/services/product.service";
import type { BaseResponse, Product } from "@/types";

export default function ProductsPage() {
  const navigate = useNavigate();

  const {
    data: products,
    isPending,
    error,
  } = useQuery<BaseResponse<Product[]>, Error, Product[]>({
    queryKey: ["products"],
    queryFn: ProductService.findAll,
    select: (res) => res.data,
  });

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="space-y-6 py-10">
      <SubHeader
        title="Products"
        description="Manage your products"
        actions={
          <Button className="w-full cursor-pointer" onClick={() => navigate("/dashboard/products/create")}>
            Create new product
          </Button>
        }
      />
      <DataTable columns={columns} data={products ?? []} />
    </section>
  );
}
