"use client";
import { Button } from "@/components/ui/AdminButton";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";
import { ProductColumn, columns } from "./columns";

interface ProductDataProps {
  data: ProductColumn[];
}

export const ProductClientUI: React.FC<ProductDataProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data?.length})`}
          description="Manage products for your store"
        />
        <Button onClick={() => router.push("/admin/products/new")}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Product
        </Button>
      </div>

      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
    </>
  );
};
