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
import type { Product } from "@/types";

export const ProductTableMenu = ({ row }: { row: Row<Product> }) => {
  const navigate = useNavigate();
  const product = row.original;

  const navigateToProductDetails = () => {
    navigate(`/dashboard/products/${product.id}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(product.id)}>Copy prodcut ID</DropdownMenuItem>
        <DropdownMenuItem onClick={navigateToProductDetails} className="cursor-pointer">
          View product details
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
