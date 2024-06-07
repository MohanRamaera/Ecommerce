"use client"
import { RoleGate } from "@/components/role.gate";
import Button from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useCurrentRole } from "@/hooks/use-current-role";

import { useRouter } from "next/navigation";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> =  ({ params }) => {
const role=useCurrentRole()
const router=useRouter()




  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <RoleGate allowedRole="ADMIN">
        <Heading title="Store" description="Overview of your store" />
        <div className="flex flex-col w-[500px] gap-5">
        <Button onClick={()=>{router.push("/admin/products")}}>Update Product Details</Button>
        <Button onClick={()=>{router.push("/admin/allOrders")}}>View All Order</Button>
        </div>
        <Separator />
        </RoleGate>
        Current Role :{role}
      </div>
    </div>
  );
};

export default DashboardPage;
