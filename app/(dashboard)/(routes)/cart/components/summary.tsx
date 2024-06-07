"use client";
import { AddressForm } from "@/components/auth/address-form";
import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { useCurrentUser } from "@/hooks/use-current-user";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const Summary = () => {
  const user=useCurrentUser()
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const totalPrice = items.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      removeAll();
    }
    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  const onCheckout = async () => {
    const response = await axios.post(`api/checkout`, {
      productIds: items.map((item) => item.id),
      userId:user?.id


    });

    // await SaveAddress(response.data.sessionID)


    // const sessionData=await stripe.checkout.sessions.retrieve(response.data.sessionID);
    // console.log(sessionData.payment_intent)
    // const paymentIntent = await stripe.paymentIntents.retrieve(sessionData?.payment_intent);
    // const billingDetails = paymentIntent?.charges.data[0].billing_details;
    // console.log("bil",billingDetails)

    // await prismadb.order.update({
    //   where:{
    //     id:order.id
    //   },
    //   data:{
    //     address:`${session.customer_details?.name}$${session.customer_details?.email}$${session.customer_details?.address}`
    //   }
    // })

    // window.location = `${response.data.url}?sessionId=${response.data.sessionID}`;
    window.location=response.data.url




  };

  return (
    <div className="px-4 py-6 mt-16 rounded-lg bg-gray-50 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="text-base font-medium text-gray-400">Order Total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      {/* <h2 className="text-lg font-medium text-gray-900">Fill Your Address  Details</h2>
      <AddressForm /> */}
      <Button
        disabled={items.length === 0}
        className="w-full mt-6"
        onClick={onCheckout}
      >
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
