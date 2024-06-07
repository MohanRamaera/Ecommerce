import { stripe } from "@/lib/stripe";

 export const getAddressDataFromStripe=async (sessionId:string)=>{
     const sessionData=await stripe.checkout.sessions.retrieve(sessionId);
     return sessionData

 }
 
 
 
 
