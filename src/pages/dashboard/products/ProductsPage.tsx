import { useState } from "react";
import { DataTable } from "@/pages/dashboard/products/DataTable";
import { columns, type Payment } from "./Columns";

const mockPayments: Payment[] = [
  { id: "1", amount: 100, status: "pending", email: "eduardo.andrade@audelabs.io" },
  { id: "2", amount: 200, status: "processing", email: "eduardo.andrade@audelabs.io" },
  { id: "3", amount: 300, status: "success", email: "eduardo.andrade@audelabs.io" },
  { id: "4", amount: 400, status: "failed", email: "eduardo.andrade@audelabs.io" },
  { id: "5", amount: 500, status: "pending", email: "eduardo.andrade@audelabs.io" },
];

export default function ProductsPage() {
  const [payments] = useState<Payment[]>(mockPayments);

  return (
    <div>
      <h1>Products List</h1>
      <DataTable columns={columns} data={payments} />
    </div>
  );
}
