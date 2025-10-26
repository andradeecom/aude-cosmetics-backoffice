import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AddAssetFormSchema, type AddAssetFormSchemaType } from "@/routes/dashboard/product-variants/details/add-asset";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

type AddAssetFormProps = {
  variantId: string;
  onSubmit: (values: AddAssetFormSchemaType) => void;
};

export function AddAssetForm({ variantId, onSubmit }: AddAssetFormProps) {
  const form = useForm<AddAssetFormSchemaType>({
    resolver: zodResolver(AddAssetFormSchema),
    defaultValues: {
      productVariantId: variantId,
      name: "",
      alt: "",
      file: undefined,
      isPrimary: false,
    },
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Fill in the details to upload an image</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="productVariantId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Variant ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Product Variant ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Image name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="alt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alt text</FormLabel>
                  <FormControl>
                    <Input placeholder="Image description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={({ field: { onChange, value: _value, ...fieldProps } }) => {
                void _value;
                return (
                  <FormItem>
                    <FormLabel>File</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          onChange(file ?? undefined);
                        }}
                        {...fieldProps}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="isPrimary"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Checkbox id="active" checked={field.value} onCheckedChange={field.onChange} />
                      <Label htmlFor="active">Set as primary</Label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full cursor-pointer">
              Upload Image
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
