"use server"

import * as z from "zod"
import { LoginSchema} from "@/schemas"
import {signIn} from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"



export const login= async (values:z.infer< typeof LoginSchema >)=>{


    const validateFields=LoginSchema.safeParse(values)


    if(!validateFields.success){
        return {error:"Invalid Fields!"}
    }
const {email,password}=validateFields.data
try{ 
    await signIn("credentials",{
        email,password,
        redirectTo:DEFAULT_LOGIN_REDIRECT
    })

    return {success:"Login Successfully"}

}catch(error){
console.log("error",error)
    if (error instanceof AuthError){
        console.log("-->>",error.type)
        switch(error.type){
            case "CredentialsSignin" :
                return {error:"Invalid Credentials"}
            default:
                return{error:"Something Went Wrong"}
        }
    }
    throw error

}

}