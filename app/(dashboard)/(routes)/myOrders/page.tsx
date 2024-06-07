import Navbar from "@/components/navbar";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { OrderColumn, columns } from "../../_components/orderColumns";
import { getMyOrders } from "@/actions/get-myOrder";
import { auth } from "@/auth";
import { getAddressDataFromStripe } from "@/actions/get-addressFromStripe";
import { getItemsDataFromStripe } from "@/actions/get-ItemsFromStripe";
import { format } from "date-fns";

interface productItemsProps{
    description:string;
    amount_total:number;
}

const MyOrder =  async () => {

const session =await auth()

const myorders=await getMyOrders(session?.user.id)
const formattedOrder:OrderColumn[] =await Promise.all(myorders?.map(async (order) => {
    // Fetch the address data from Stripe for the given order
    const orderData = await getAddressDataFromStripe(order.address);
    const lineItems=await getItemsDataFromStripe(order.address)
  

    const  customer_details  = orderData?.customer_details ;
    const  address  =  orderData?.customer_details?.address ;
 

   
       const products = lineItems.data.map((item:productItemsProps) => (
        `${item.description}*${item.amount_total/100}`
      ));
  
  
   
    return {
      id: order.id,
      name: customer_details?.name,
      mobileNumber: customer_details?.phone,
      line1: address?.line1,
      products:products,
      city: address?.city,
      price:orderData?.amount_total?orderData?.amount_total/100 :null,
      pinCode: address?.postal_code,
      state: address?.state,
      createdAt: format(order.createdAt, "MMMM do, yyyy"),
    };
  }));

  

    return (<>
    <Navbar/>
          <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
     <Heading title="My Order" description="Check Your All Order Here" />
     </div>
     
     </div>

     <Separator />
      <DataTable columns={columns} data={formattedOrder} searchKey="name" />
    </>  );
}
 
export default MyOrder;