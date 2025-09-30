import { useState } from "react";
import { DataTable } from "@/pages/dashboard/products/DataTable";
import { columns } from "./Columns";
import type { Product } from "@/types";
import { mockedProducts } from "./mocked-data";
import { SubHeader } from "@/components";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function ProductsPage() {
  const [products] = useState<Product[]>(mockedProducts);
  const navigate = useNavigate();

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
      <DataTable columns={columns} data={products} />
    </section>
  );
}
