import type { ColumnDef } from "@tanstack/react-table";
import type { ProductVariant } from "@/types";
import { ProductVariantTableMenu } from "@/routes/dashboard/product-variants/list/table/product-variant-table-menu";
import { formatPrice } from "@/lib/utils";

export const columns: ColumnDef<ProductVariant>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-2 max-w-40">
        <p className="text-wrap">{row.getValue("name")}</p>
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(formatPrice(row.getValue("price")));

      const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
      }).format(price);
      return <div className="flex flex-wrap gap-2 max-w-32">{formattedPrice}</div>;
    },
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-2 max-w-32">{row.getValue<boolean>("isActive") ? "Yes" : "No"}</div>
    ),
  },
  {
    accessorKey: "images",
    header: "Images",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-2 max-w-32">{row.getValue<string[] | null>("images")?.length}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <ProductVariantTableMenu row={row} />,
  },
];
