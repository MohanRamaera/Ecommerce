import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const body = await req.json();

    const { name, price, images, isFeatured, isArchived } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!price) new NextResponse("Price is required", { status: 400 });

    if (!isFeatured) new NextResponse("Featured is required", { status: 400 });

    if (!isArchived) new NextResponse("Archived is required", { status: 400 });

    if (!images || !images.length) {
      return new NextResponse("Image is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }
    const product = await prismadb.product.create({
      data: {
        name,
        Image: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
        price,
        isFeatured,
        isArchived,
      },
    });

    return NextResponse.json(product);
  } catch (err) {
    console.log(`[PRODUCTS_POST] ${err}`);
    return new NextResponse(`Internal error`, { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const isFeatured = searchParams.get("isFeatured");

    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        Image: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (err) {
    console.log(`[PRODUCTS_GET] ${err}`);
    return new NextResponse(`Internal error`, { status: 500 });
  }
}
