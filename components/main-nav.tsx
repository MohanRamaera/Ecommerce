"use client"
import { useParams, usePathname } from "next/navigation";

const MainNav = ({className, ...props}:React.HTMLAttributes<HTMLElement>) => {
    const pathname=usePathname()
    const params=useParams()
        const routes =[
            {
        
            }
        ]
    return ( <nav></nav> );
}
 
export default MainNav;