import { useParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

// Mock data - in a real app, this would come from an API
const mockProducts = [
  {
    id: "PROD-001",
    name: "Premium Skincare Set",
    description:
      "A complete skincare set including cleanser, toner, and moisturizer. Formulated with natural ingredients for all skin types.",
    price: 89.99,
    status: "in_stock",
    stock: 42,
    category: "Skincare",
    createdAt: "2023-09-15T10:30:00Z",
    updatedAt: "2023-09-20T14:45:00Z",
    variants: [
      { id: "VAR-001", name: "Normal to Dry", sku: "SKU-001", price: 89.99, stock: 25 },
      { id: "VAR-002", name: "Oily to Combination", sku: "SKU-002", price: 89.99, stock: 17 },
    ],
  },
  // Add more mock products as needed
];

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // In a real app, you would fetch the product by ID here
  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Button variant="outline" className="mt-4" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Product Details</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Edit</Button>
          <Button>Save Changes</Button>
        </div>
      </div>

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
                  <p className="text-sm font-medium text-muted-foreground">Price</p>
                  <p>${product.price.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <div className="flex items-center">
                    <span
                      className={`h-2 w-2 rounded-full mr-2 ${
                        product.status === "in_stock" ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    <span className="capitalize">{product.status.replace("_", " ")}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Category</p>
                  <p>{product.category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Stock</p>
                  <p>{product.stock} units</p>
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
                {product.variants.map((variant) => (
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
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Image</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center h-48 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Product Image</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Created</p>
                <p>{new Date(product.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                <p>{new Date(product.updatedAt).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
