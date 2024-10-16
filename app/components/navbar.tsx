'use client'
import { NavbarRoutes }   from '@/components/navbar-routes'
import { MobileSidebar } from '@/app/components/mobile-sidebar'
import SearchBar from '@/app/components/searchbar'
import { usePathname } from 'next/navigation';


export const Navbar =() => {
    
    const searchPage = usePathname('/search');
    


    return (
        <div className="p-4 border-b h-full flex flex-wrap items-center bg-white shadow-sm  ">
            <MobileSidebar />
            
            {searchPage === '/search' && <SearchBar />}

            <NavbarRoutes />
        </div>
    )
}