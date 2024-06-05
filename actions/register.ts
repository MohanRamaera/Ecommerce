"use server"

import * as z from "zod"
import bcrypt from "bcryptjs"
import { RegisterSchema } from "@/schemas"

import  prismadb  from "@/lib/prismadb"
import { getUserByEmail } from "@/data/user"


export const register=async (values:z.infer< typeof RegisterSchema >)=>{


    const validateFields=RegisterSchema.safeParse(values)


    if(!validateFields.success){
        return {error:"Invalid Fields!"}
    }
    const { email,password,name}=validateFields.data
    const hashedPassword=await bcrypt.hash(password,10)
    const exisitingUser=await getUserByEmail(email)

    if (exisitingUser){
        return {error:"Email Already in Use"}

    }

    await prismadb.user.create({
        data:{
            name,
            email,
            password:hashedPassword
        }
    })

    // TODO : SEND VERIFICATION TOKEN 
    
    return {success:"User  Created"}

}