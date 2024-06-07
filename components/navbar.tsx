"use client";
import { User, ShoppingCart } from "lucide-react";
import { Logo } from "@/app/(dashboard)/_components/logo";
import NavbarActions from "./ui/navbar-actions";
import { useRouter } from "next/navigation";
import { useCurrentRole } from "@/hooks/use-current-role";
import Button from "./ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { logout } from "@/actions/logout";
const Navbar = () => {
const role=useCurrentRole()
const user=useCurrentUser()
const router=useRouter()


  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div>
          <Logo />
        </div>
        <div className="ml-auto flex items-center space-x-4">
      {role==="ADMIN" && 
      <h2 onClick={() => router.push("/admin")}>
      {" "}
      <Button>
      Go To Admin Dashboard
      </Button>
    </h2>}
          
          <ShoppingCart />
          <NavbarActions />
          <Popover>
  <PopoverTrigger> {user?.image?<div  className="rounded-full"> <img  className="rounded-full" height={40} width={40} src={user.image} /></div>:<User />}</PopoverTrigger>
  <PopoverContent className="cursor-pointer">
    <div  onClick={()=>{router.push("/myOrders")}}>
      My Orders 
    </div>
    <div onClick={()=>{  logout()}}>
      SignOut
    </div>
  </PopoverContent>
</Popover>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
