// import GitHub from "next-auth/providers/github"
import bcrypt from "bcryptjs"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "@/schemas"
import type { NextAuthConfig } from "next-auth"
import { getUserByEmail } from "@/data/user"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
 
export default { 
    providers: [
        Github({
            clientId:process.env.GITHUB_CLIENT_ID,
            clientSecret:process.env.GITHUB_CLIENT_SECRET
        }),
        Google({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET
        }),
    Credentials({
        credentials: {
            email: {},
            password: {},
          },
        async authorize(credentials) {
            const validateFields=LoginSchema.safeParse(credentials)
            if (validateFields.success){
                const {email,password}=validateFields.data
                const user=await getUserByEmail(email)


                if(!user ||!user.password) return null

                const passwordMatched= await bcrypt.compare(
                    password,user.password
                )

                if(passwordMatched) return user
           
            }
            return null
            
        },
    })
] } satisfies NextAuthConfig