import type { ColumnDef } from "@tanstack/react-table";
import type { Product } from "@/types";
import { ProductTableMenu } from "@/routes/dashboard/products/list/table/product-table-menu";

export const columns: ColumnDef<Product>[] = [
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
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-2 max-w-32">
        {row.getValue<string[]>("tags")?.map((tag) => (
          <span key={tag} className="px-2 py-1 text-xs bg-amber-100 rounded">
            {tag}
          </span>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "collection",
    header: "Collection",
  },
  {
    accessorKey: "seoTitle",
    header: "SEO Title",
  },
  {
    id: "actions",
    cell: ({ row }) => <ProductTableMenu row={row} />,
  },
  // {
  //   accessorKey: "amount",
  //   header: () => <div className="text-right">Amount</div>,
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue("amount"));
  //     const formatted = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //     }).format(amount);

  //     return <div className="text-right font-medium">{formatted}</div>;
  //   },
  // },
];
