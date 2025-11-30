import { SubHeader } from "@/components";
import { Button } from "@/components/ui/button";
import { useProductVariantsList } from "./useProductVariantsList";

export const ProductVariantsListPage = () => {
  const { variantsList, navigateToCreateProductVariant } = useProductVariantsList();

  return (
    <section className="space-y-6 py-10">
      <SubHeader
        title="Product Variants"
        description="Manage the product variants"
        actions={
          <Button className="w-full cursor-pointer" onClick={navigateToCreateProductVariant}>
            Create new variant
          </Button>
        }
      />
      {variantsList()}
    </section>
  );
};
