import {Logo} from '@/app/components/Logo'
import {SidebarRoutes} from '@/app/components/sidebar-routes-teacher'


const SidebarTeacher = () => {
    return (
        <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
            <div className="p-6">
                <Logo />
            </div>
            <div className='flex flex-col w-full'>
                <SidebarRoutes />
            </div>
        </div>
    )
}

export default SidebarTeacher;