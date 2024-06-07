"use client";
import { User, ShoppingCart } from "lucide-react";
import { Logo } from "@/app/(dashboard)/_components/logo";
import NavbarActions from "./ui/navbar-actions";
import { usePathname, useRouter } from "next/navigation";
import { useCurrentRole } from "@/hooks/use-current-role";
import Button from "./ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { logout } from "@/actions/logout";
import { useSession } from "next-auth/react";
const Navbar = () => {
const role=useCurrentRole()
const user=useCurrentUser()
const router=useRouter()
const session=useSession()

const pathName=usePathname()


useEffect(()=>{
  router.refresh()
},[pathName])

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div>
          <Logo />
        </div>
        <div className="ml-auto flex items-center space-x-4">
      {session.data?.user.role==="ADMIN" && 
      <h2 onClick={() => router.push("/admin")}>
      {" "}
      <Button>
      Go To Admin Dashboard
      </Button>
    </h2>}
          
          <ShoppingCart />
          <NavbarActions />
          <Popover>
  <PopoverTrigger> {session.data?.user?.image?<div  className="rounded-full"> <img  className="rounded-full" height={40} width={40} src={user.image} /></div>:<User />}</PopoverTrigger>
{session.data?.user.role? <PopoverContent className="cursor-pointer">
    <div  onClick={()=>{router.push("/myOrders")}}>
      My Orders 
    </div>
    <div onClick={ ()=>{logout()}}>
      SignOut
    </div>
  </PopoverContent> :
  <PopoverContent className="cursor-pointer">
  <div  onClick={()=>{router.push("/auth/login")}}>
  Login
  </div>
 
</PopoverContent> 
  }
</Popover>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
