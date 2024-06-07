"use client"

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/AdminButton";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";
const SettingsPage =  () => {
    const user=useCurrentUser()
    const router=useRouter()

   


    return (

    <form >

        <p> Login Sucess Fully </p>

        <Button onClick={()=>{router.push("/");router.refresh()}}> Go TO DashBoard</Button>
    </form>
    
    
    )
}
 
export default SettingsPage;