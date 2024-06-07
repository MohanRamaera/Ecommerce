import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prismadb from "@/lib/prismadb";
import { useCurrentUser } from "@/hooks/use-current-user";



export async function GET(
    req: Request,
) {
    try {
        const url = new URL(req.url);
        const userId = url.searchParams.get('id');

        const products = await prismadb.order.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(products);

    } catch (err) {
        console.log(`[Order] ${err}`);
        return new NextResponse(`Internal error ${err}`, { status: 500})
    }
}