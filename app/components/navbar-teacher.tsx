'use client'
import { NavbarRoutes }   from '@/components/navbar-routes'
import { MobileSidebarTeacher } from '@/app/components/mobile-sidebar-teacher'
import SearchBar from '@/app/components/searchbar'
import { usePathname } from 'next/navigation';


export const Navbar =() => {
    
    const searchPage = usePathname('/search-teacher');
    


    return (
        <div className="p-4 border-b h-full flex flex-wrap items-center bg-white shadow-sm  ">
            <MobileSidebarTeacher />
            
            {searchPage === '/search-teacher' && <SearchBar />}

            <NavbarRoutes />
        </div>
    )
}