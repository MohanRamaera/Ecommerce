"use client";
import { User, ShoppingCart } from "lucide-react";
import MainNav from "@/components/main-nav";
import { Logo } from "@/app/(dashboard)/_components/logo";
import NavbarActions from "./ui/navbar-actions";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const router = useRouter();
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div>
          <Logo />
          <MainNav className="mx-6" />
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <h2 onClick={() => router.push("/admin/products")}>
            {" "}
            Go To Admin Dashboard
          </h2>
          <ShoppingCart />
          <NavbarActions />
          <User />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
