import { User,ShoppingCart } from 'lucide-react'
import MainNav from '@/components/main-nav';
import { Logo } from '@/app/(dashboard)/_components/logo';
const Navbar = () => {
    return ( <div className="border-b">
        <div className="flex h-16 items-center px-4">

            <div>
                <Logo />
                <MainNav className='mx-6'/>
            </div>
            <div className="ml-auto flex items-center space-x-4">
                <ShoppingCart/>
                <User />

            </div>
        </div>

    </div> );
}
 
export default Navbar;