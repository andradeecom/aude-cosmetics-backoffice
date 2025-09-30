import { SubHeader } from "@/components";
import { CreateProductForm } from "@/components/CreateProductForm";
import { formSchema } from "./create-product-form-schema";
import { z } from "zod";

export default function ProductCreatePage() {
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", values);
    alert("Product created successfully!");
  };

  return (
    <section className="space-y-6 py-10">
      <SubHeader title="New Product" />
      <CreateProductForm onSubmit={handleSubmit} />
    </section>
  );
}
