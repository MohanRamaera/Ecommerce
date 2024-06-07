import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
) {
  try {
    const body = await req.json();

    console.log("1")

    const { name, price, Image,categoryId, isFeatured, isArchived } = body;
console.log("hereee")
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!price) new NextResponse("Price is required", { status: 400 });

    if (!isFeatured) new NextResponse("Featured is required", { status: 400 });

    if (!isArchived) new NextResponse("Archived is required", { status: 400 });

    if (!Image || !Image.length) {
      return new NextResponse("Image is required", { status: 400 });
    }

    const product = await prismadb.product.create({
      data: {
        name,
        Image: {
          createMany: {
            data: [...Image.map((image: { url: string }) => image)],
          },
        },
        categoryId,
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
) {
  try {
    const { searchParams } = new URL(req.url);
    const isFeatured = searchParams.get("isFeatured");

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
