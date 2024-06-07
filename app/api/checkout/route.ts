import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  const { productIds,userId } = await req.json();

  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product ids are required", { status: 400 });
  }

  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  console.log(line_items);
  products.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: "INR",
        product_data: {
          name: product.name,
        },
        unit_amount: Number(product.price) * 100,
      },
    });
  });

  const order = await prismadb.order.create({
    data: {
      isPaid: false,
      userId,
      OrderItem: {
        create: productIds.map((productId: string) => ({
          Product: {
            connect: {
              id: productId,
            },
          },
        })),
      },
    },
  });

  try {
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${process.env.FRONTEND_URL}/cart?success=1`,
      cancel_url: `${process.env.FRONTEND_URL}/cart?cancelled=1`,
      metadata: {
        orderId: order.id,
      },
    });

    

    await prismadb.order.update({
      where:{
        id:order.id
      },
      data:{
        address: session.id
      }
    })


    return NextResponse.json(
      { sessionID:session.id,
         url: session.url
        
       },
      {
        headers: corsHeaders,
      }
    );
  } catch (err) {
    console.log("err", err);
  }
}
