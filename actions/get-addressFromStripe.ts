import { stripe } from "@/lib/stripe";

 export const getAddressDataFromStripe=async (sessionId:string)=>{
     const sessionData=await stripe.checkout.sessions.retrieve(sessionId);
     return sessionData

 }
 
 
 
 
 // const sessionData=await stripe.checkout.sessions.retrieve(response.data.sessionID);
    // console.log(sessionData.payment_intent)
    // const paymentIntent = await stripe.paymentIntents.retrieve(sessionData?.payment_intent);
    // const billingDetails = paymentIntent?.charges.data[0].billing_details;