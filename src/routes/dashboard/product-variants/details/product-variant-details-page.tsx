import { useParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import { SubHeader } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { ProductVariantService } from "@/services/product-variant.service";
import type { BaseResponse, ProductVariant } from "@/types";
import { formatDate } from "@/lib/utils";
import { VariantDeleteDialog } from "./product-variant-delete";

export const ProductVariantDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: variant,
    isPending,
    error,
  } = useQuery<BaseResponse<ProductVariant>, Error, ProductVariant>({
    queryKey: ["variant", id],
    queryFn: () => ProductVariantService.findById(id!),
    select: (res) => res.data,
  });

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  if (!variant) {
    return (
      <section className="flex flex-col items-center justify-center h-64">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Button variant="outline" className="mt-4" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </section>
    );
  }

  return (
    <section className="space-y-6 py-10">
      <SubHeader
        title="Variant Details"
        actions={
          <>
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => navigate(`/dashboard/product-variants/${id}/update`)}
            >
              Edit
            </Button>
            <VariantDeleteDialog id={id!} />
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Variant Information</CardTitle>
              <CardDescription>Basic details about the variant</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">{variant.name}</h3>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Variant Images</CardTitle>
              <CardDescription>Available images of this variant (add images here too)</CardDescription>
              <CardAction>
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => navigate(`/dashboard/product-variants/${id}/add-asset`)}
                >
                  Add Image
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              {variant.images.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {variant.images.map((image) => (
                    <div key={image.id} className="size-60">
                      <img src={image.url} alt={image.name} />
                    </div>
                  ))}
                </div>
              ) : (
                <p>No images available</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Created</p>
                <p>{formatDate(variant.createdAt!)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                <p>{formatDate(variant.updatedAt!)}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
