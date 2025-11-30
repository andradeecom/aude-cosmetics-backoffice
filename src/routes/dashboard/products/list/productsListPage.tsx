import { SubHeader } from "@/components";
import { Button } from "@/components/ui/button";
import { useProductsList } from "./useProductsList";

export const ProductsListPage = () => {
  const { productsList, navigateToCreateProduct } = useProductsList();

  return (
    <section className="space-y-6 py-10">
      <SubHeader
        title="Products"
        description="Manage your products"
        actions={
          <Button className="w-full cursor-pointer" onClick={navigateToCreateProduct}>
            Create new product
          </Button>
        }
      />
      {productsList()}
    </section>
  );
};
