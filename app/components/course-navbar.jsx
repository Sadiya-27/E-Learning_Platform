import {NavbarRoutes} from '@/app/components/course-navbar-routes'
import Image from 'next/image'

export const Navbar =() => {
    return (
        <div className="px-4 border-b pb-5 md:pb-0 h-full flex flex-wrap items-center bg-white shadow-sm  ">
            
            <Image src='/logo.png' alt='logo' width={200} height={100}/>
            <NavbarRoutes />
        </div>
    )
}