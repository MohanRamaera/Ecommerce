import prismadb from "@/lib/prismadb";
import { Billboard } from "@/types";
import axios from "axios";
import { NextResponse } from "next/server";



const getBillboard = async (id: string) => {



    const billboard=await prismadb.billboard.findUnique({
        where: {
            id,
        }
    })
    // return NextResponse.json(billboard);
    // console.log(res.data)
    return billboard
}

export default getBillboard;