import { stripe } from "@/lib/stripe";

 export const getItemsDataFromStripe=async (sessionId:string)=>{
     const lineItems=await stripe.checkout.sessions.listLineItems(sessionId);
     console.log(lineItems)
     return lineItems

 }
 
 
 
 
 // const sessionData=await stripe.checkout.sessions.retrieve(response.data.sessionID);
    // console.log(sessionData.payment_intent)
    // const paymentIntent = await stripe.paymentIntents.retrieve(sessionData?.payment_intent);
    // const billingDetails = paymentIntent?.charges.data[0].billing_details;