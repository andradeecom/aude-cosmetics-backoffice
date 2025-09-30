import { useParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockedProducts } from "../mocked-data";
import { SubHeader } from "@/components";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // In a real app, you would fetch the product by ID here
  const product = mockedProducts.find((p) => p.id === id);

  if (!product) {
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
        title="Product Details"
        actions={
          <>
            <Button variant="outline" className="cursor-pointer">
              Edit
            </Button>
            <Button variant="destructive" className="cursor-pointer">
              Delete
            </Button>
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
              <CardDescription>Basic details about the product</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Category</p>
                  <p>{product.category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Collection</p>
                  <p>{product.collection}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Variants</CardTitle>
              <CardDescription>Available variations of this product</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* {product.variants.map((variant) => (
                  <div key={variant.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{variant.name}</h4>
                        <p className="text-sm text-muted-foreground">SKU: {variant.sku}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${variant.price.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">{variant.stock} in stock</p>
                      </div>
                    </div>
                  </div>
                ))} */}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {/* <Card>
            <CardHeader>
              <CardTitle>Product Image</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center h-48 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Product Image</p>
            </CardContent>
          </Card> */}

          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Created</p>
                <p>{product.createdAt?.toLocaleDateString() || "-"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                <p>{product.updatedAt?.toLocaleDateString() || "-"}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
