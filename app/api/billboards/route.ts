import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        // const { userId } = auth();
        const body = await req.json();

        const { label, imageUrl } = body; 

        // if (!userId) {
        //     return new NextResponse("Unauthenticated", { status: 401 });
        // }

        if (!label) {
            return new NextResponse("Label is required", { status: 400});
        }

        if (!imageUrl) {
            return new NextResponse("Image Url is required", { status: 400});
        }

        if (!params.storeId) {
            return new NextResponse("Store Id is required", { status: 400});
        }

     

       

        const billboard = await prismadb.billboard.create({
            data : {
                label,
                imageUrl,
            
            }
        })

        return NextResponse.json(billboard);

    } catch (err) {
        console.log(`[BILLBOARDS_POST] ${err}`);
        return new NextResponse(`Internal error`, { status: 500})
    }
}

export async function GET(
    req: Request,

) {
    try {

        console.log("--here",req)
      
        const billboards = await prismadb.billboard.findMany({})
        console.log(billboards)

        return NextResponse.json(billboards);

        

    } catch (err) {
        console.log(`[BILLBOARDS_GET] ${err}`);
        return new NextResponse(`Internal error`, { status: 500})
    }
}