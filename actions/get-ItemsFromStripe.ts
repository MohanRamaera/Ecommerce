import { stripe } from "@/lib/stripe";

 export const getItemsDataFromStripe=async (sessionId:string)=>{
     const lineItems=await stripe.checkout.sessions.listLineItems(sessionId);
     return lineItems

 }
 
 
 
