import { Menu } from 'lucide-react'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from '@/components/ui/sheet'
import Sidebar from '@/app/components/sidebar'
import SidebarTeacher from '@/app/components/sidebar-teacher'


export const MobileSidebar =() => {
    return (
        <Sheet>
            <SheetTrigger className='md:hidden pr-4 hover:opacity-75 transition'>
                <Menu  />
            </SheetTrigger>
            <SheetContent side='left' className='p-0 bg-white'>
                <Sidebar />
            </SheetContent>
        </Sheet>

        
    )
}