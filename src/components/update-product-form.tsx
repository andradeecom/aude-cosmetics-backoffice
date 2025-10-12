import React from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CATEGORY_TYPES, COLLECTION_TYPES, type BaseResponse, type Product } from "@/types";
import {
  formSchema,
  type UpdateProductInFormSchema,
} from "@/routes/dashboard/products/update/update-product-form-schema";
import { ProductService } from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";

type UpdateProductFormProps = {
  onSubmit: (values: UpdateProductInFormSchema) => void;
  id: string;
};

export function UpdateProductForm({ onSubmit, id }: UpdateProductFormProps) {
  const { data: product, isPending } = useQuery<BaseResponse<Product>, Error, Product>({
    queryKey: ["product", id],
    queryFn: () => ProductService.findById(id),
    select: (res) => res.data,
  });

  const form = useForm<UpdateProductInFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      tags: [],
      category: "",
      collection: "",
      seoTitle: "",
      seoDescription: "",
    },
  });

  // Update form values when product data is loaded
  React.useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        description: product.description || "",
        tags: product.tags || [],
        category: product.category || "",
        collection: product.collection || "",
        seoTitle: product.seoTitle || "",
        seoDescription: product.seoDescription || "",
      });
    }
  }, [product, form]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Fill in the details to update the product</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder={product?.name || "Product name"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder={product?.description || "Product description2"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter tags separated by commas"
                      value={field.value?.join(", ") || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value ? value.split(",").map((tag) => tag.trim()) : []);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={product?.category || "Select a category"} />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(CATEGORY_TYPES).map(([key, value]) => (
                          <SelectItem key={key} value={value}>
                            {key
                              .split("_")
                              .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
                              .join(" ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="collection"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Collection</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={product?.collection || "Select a collection"} />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(COLLECTION_TYPES).map(([key, value]) => (
                          <SelectItem key={key} value={value}>
                            {key
                              .split("_")
                              .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
                              .join(" ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seoTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SEO Title</FormLabel>
                  <FormControl>
                    <Input placeholder="SEO title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seoDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SEO Description</FormLabel>
                  <FormControl>
                    <Input placeholder="SEO description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full cursor-pointer">
              Update Product
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
