import { getItemsDataFromStripe } from "@/actions/get-ItemsFromStripe";
import { getAddressDataFromStripe } from "@/actions/get-addressFromStripe";
import { getAllOrders } from "@/actions/get-allOrder";
import { OrderColumn, columns } from "@/app/(dashboard)/_components/orderColumns";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { useState } from "react";

const allOrder = async () => {
  const allOrder = await getAllOrders();

  const formattedOrder:OrderColumn[] =await Promise.all(allOrder?.map(async (order) => {
    // Fetch the address data from Stripe for the given order
    if (order.address){
    const orderData = await getAddressDataFromStripe(order.address);
    const lineItems=await getItemsDataFromStripe(order.address)
  
    
    // Destructure the customer details and address from the address data
    const  customer_details  = orderData?.customer_details ;
    const  address  =  orderData?.customer_details?.address 
 

       // Map over lineItems to get the products
       const products = lineItems.data.map((item) => (
        `${item.description}*${item.amount_total/100}`
    

      ));
  
  
    // Return the formatted order
    return {
      id: order.id,
      name: customer_details?.name,
      mobileNumber: customer_details?.phone,
      line1: address?.line1,
      products:products,
      city: address?.city,
      price:orderData.amount_total?orderData.amount_total/100:null ,
      pinCode: address?.postal_code,
      state: address?.state,
      createdAt: format(order.createdAt, "MMMM do, yyyy"),
    };
  }
  }));

  return (
    <>
      <div className="flex-col">
        <div className="flex-1 p-8 pt-6 space-y-4">
          <Heading title="All Order" description="Check  All Order Here" />
        </div>
      </div>

      <Separator />
{allOrder.length>0 && <DataTable columns={columns} data={formattedOrder} searchKey="name" /> }

    </>
  );
};

export default allOrder;
