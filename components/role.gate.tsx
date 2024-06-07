"use client"

import { useCurrentRole } from "@/hooks/use-current-role";
import { FormError } from "./form-error";

interface RoleGateProps{
    children:React.ReactNode;
    allowedRole:"USER"|"ADMIN"
}

export const RoleGate=({children,allowedRole}:RoleGateProps)=>{
    const role=useCurrentRole()

     if (role != allowedRole){
        return <FormError message="You Do Not have Permission to View This Page"/>
     }

     return <>
     {children}</>

}