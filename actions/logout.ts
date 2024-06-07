"use server"

import { signOut } from "@/auth"


export const logout = async () => {
    console.time("start")
    await signOut()
    console.timeEnd("start")

}
 
