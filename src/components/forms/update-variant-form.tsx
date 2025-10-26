import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  type UpdateProductVariantFormSchema,
  formSchema,
} from "@/routes/dashboard/product-variants/update/update-product-variant-form-schema";
import { useQuery } from "@tanstack/react-query";
import { ProductVariantService } from "@/services/product-variant.service";
import type { BaseResponse, ProductVariant } from "@/types";

type UpdateProductVariantFormProps = {
  onSubmit: (values: UpdateProductVariantFormSchema) => void;
  id: string;
};

export function UpdateVariantForm({ onSubmit, id }: UpdateProductVariantFormProps) {
  const { data: variant, isPending } = useQuery<BaseResponse<ProductVariant>, Error, ProductVariant>({
    queryKey: ["variant", id],
    queryFn: () => ProductVariantService.findById(id),
    select: (res) => res.data,
  });

  const form = useForm<UpdateProductVariantFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      productId: "",
      isActive: false,
    },
  });

  React.useEffect(() => {
    if (variant) {
      form.reset({
        name: variant.name,
        price: variant.price,
        productId: variant.productId,
        isActive: variant.isActive,
      });
    }
  }, [variant, form]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Fill in the details to update this variant</CardTitle>
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
                    <Input placeholder="Variant name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price in cents</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={(e) => field.onChange(e.target.valueAsNumber || 0)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Related Product ID" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Checkbox id="active" checked={field.value} onCheckedChange={field.onChange} />
                      <Label htmlFor="active">Activate Variant</Label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full cursor-pointer">
              Update Variant
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
