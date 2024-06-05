import NextAuth,{type DefaultSession} from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import {PrismaAdapter} from "@auth/prisma-adapter"
import prismadb from "@/lib/prismadb"
import { getUserById } from "@/data/user"

import authConfig from "@/auth.config"


export type ExtendedUser=DefaultSession["user"] &{
    role:"USER"|"ADMIN"
}

declare module "next-auth"{
    interface Session {
        user:ExtendedUser
    }
}
 
export const { auth, handlers, signIn, signOut } = NextAuth({
    pages:{
        signIn:"/auth/login",
        error:"/auth/error"
    },
    events:{
        async linkAccount({user}) {
            await prismadb.user.update({where:{
              id:user.id
            },
        data:{
            emailVerified:new Date()
        }})
            
        },
    },
    callbacks:{
        async session({token,session}){
          
           if(token.sub && session.user){
            session.user.id=token.sub
           }

           if (token.role && session.user){
            session.user.role=token.role as "ADMIN" |"USER";
           }
            return session

        },
        async jwt({token}) {
  if(!token.sub) return token ;

  
  const existingUser=await getUserById(token.sub)

  if (!existingUser) return token

    token.role=existingUser.role
        return token
        
    },},

adapter:PrismaAdapter(prismadb),
session:{strategy:"jwt"},
...authConfig,
})