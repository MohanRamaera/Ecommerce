import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prismadb from "@/lib/prismadb";
import { useCurrentUser } from "@/hooks/use-current-user";

export async function POST(
    req: Request,
) {
    try {
        const body = await req.json();
console.log("here")
        const {
            name,
            price,
            categoryId,
            Image,
            isFeatured,
            isArchived
        } = body; 

      

        if (!name) {
            return new NextResponse("Name is required", { status: 400});
        }

        if (!price) new NextResponse("Price is required", { status: 400});

        if (!categoryId) new NextResponse("Category id is required", { status: 400});

        if (!isFeatured) new NextResponse("Featured is required", { status: 400});

        if (!isArchived) new NextResponse("Archived is required", { status: 400});

        if (!Image || !Image.length) {
            return new NextResponse("Image is required", { status: 400});
        }

    

   

        const product = await prismadb.product.create({
            data : {
                name,
                Image: {
                    createMany: {
                        data: [
                            ...Image.map((image: { url:string }) => image)
                        ]
                    }
                },
                price,
                isFeatured,
                isArchived,
                categoryId,
            }
        })

        return NextResponse.json(product);

    } catch (err) {
        console.log(`[PRODUCTS_POST] ${err}`);
        return new NextResponse(`Internal error `, { status: 500})
    }
}

export async function GET(
    req: Request,
) {
    try {
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get('categoryId') || undefined;
        const isFeatured = searchParams.get('isFeatured');


        const products = await prismadb.product.findMany({
            where: {
               
                categoryId,
                // colorId,
                // sizeId,
                isFeatured: isFeatured ? true : undefined,
                isArchived: false
            },
            include: {
                Image: true,
                category: true,
                // color: true,
                // size: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(products);

    } catch (err) {
        console.log(`[PRODUCTS_GET] ${err}`);
        return new NextResponse(`Internal error ${err}`, { status: 500})
    }
}