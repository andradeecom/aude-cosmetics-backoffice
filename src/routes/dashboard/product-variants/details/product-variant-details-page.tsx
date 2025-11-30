import { useParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import { SubHeader } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { ProductVariantService } from "@/services/product-variant.service";
import type { BaseResponse, ProductImage, ProductVariant } from "@/types";
import { convertFileSize, formatDate } from "@/lib/utils";
import { VariantDeleteDialog } from "./product-variant-delete";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { ImageDeleteDialog } from "./product-image-delete";
import { useCallback } from "react";

export const ProductVariantDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const renderImages = useCallback(
    (image: ProductImage) => (
      <div key={image.id} className="w-fit">
        <Dialog>
          <DialogTrigger className="cursor-pointer" asChild>
            <div className="size-40 rounded-lg overflow-hidden">
              <img src={image.url} alt={image.name} className="w-full h-full object-cover" />
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{image.name}</DialogTitle>
            </DialogHeader>
            <>
              <img src={image.url} alt={image.name} />
              <p>Alternative text: {image.alt}</p>
              <p>File type: {image.type}</p>
              <p>File size: {convertFileSize(image.size)}</p>
              <p>Primary: {image.isPrimary ? "Yes" : "No"}</p>
              <p>Created: {formatDate(image.createdAt!)}</p>
              <p>Updated: {formatDate(image.updatedAt!)}</p>
              <a href={image.url} target="_blank" rel="noopener noreferrer" className="underline">
                Link to image
              </a>
            </>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
              <ImageDeleteDialog ImageId={image.id} />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    ),
    []
  );

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

      <div className="flex flex-col space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Variant Information</CardTitle>
            <CardDescription>Basic details about the variant</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">{variant.name}</h3>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Created</p>
                <p>{formatDate(variant.createdAt!)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                <p>{formatDate(variant.updatedAt!)}</p>
              </div>
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
              <div className="flex flex-wrap gap-4 justify-start items-center">{variant.images.map(renderImages)}</div>
            ) : (
              <p>No images available</p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
