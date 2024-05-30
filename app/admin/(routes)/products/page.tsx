"use client"
import { useEffect, useState } from "react";
import axios from "axios"
import ProductClientUI from "./components/clientUI";
import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import DataTable from "./components/table";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import prismadb from "@/lib/prismadb"
import { ProductColumn } from "./components/columns";
import { formatter } from "@/lib/utils";
import { format } from 'date-fns'

const ProductPageAdmin =async  () => {

    const products = await prismadb.product.findMany({
        
        orderBy: {
            createdAt: 'desc'
        }
    })


    const formattedProducts:ProductColumn[] = products?.map(item => ({
        id: item.id,
        name: item.name,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        price: formatter.format(Number(item.price)),
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));


    return (
        <>
  
  <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <ProductClientUI data={formattedProducts} />
            </div>
        </div>



        </>


   );
}
 
export default ProductPageAdmin;