import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  formSchema,
  type CreateProductVariantFormSchema,
} from "@/routes/dashboard/product-variants/create/create-product-variant-form-schema";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

type CreateProductFormProps = {
  onSubmit: (values: CreateProductVariantFormSchema) => void;
};

export function CreateVariantForm({ onSubmit }: CreateProductFormProps) {
  const form = useForm<CreateProductVariantFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      productId: "",
      isActive: false,
    },
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Fill in the details to create a new variant</CardTitle>
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
                    <Input placeholder="Related Product ID" {...field} />
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
                  {/* <FormLabel>Active</FormLabel> */}
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
              Create Variant
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
