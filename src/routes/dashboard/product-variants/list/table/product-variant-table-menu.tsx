import { type Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ProductVariant } from "@/types";

export const ProductVariantTableMenu = ({ row }: { row: Row<ProductVariant> }) => {
  const navigate = useNavigate();
  const variant = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer" onClick={(e) => e.stopPropagation()}>
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(variant.id);
          }}
          className="cursor-pointer"
        >
          Copy variant ID
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/dashboard/product-variants/${variant.id}`);
          }}
          className="cursor-pointer"
        >
          View variant details
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
