'use client'
import {Layout, Compass,House ,Settings, PencilLine} from 'lucide-react'
import {SidebarItems} from '@/app/components/sidebar-item'

const guestRoutes= [
    {
        icon: House,
        Label : "Home",
        href: "/teacher"
    },
    {
        icon: Compass,
        Label : "Explore Courses",
        href: "/search-teacher"
    },
    {
        icon: PencilLine,
        Label : "Create Course",
        href: "/create-course"
    },
    {
        icon: Layout,
        Label : "Dashboard",
        href: "/teacher-dashboard"
    },
    {
        icon: Settings,
        Label : "Settings",
        href: "/teacher-profile"
    },
]

export const SidebarRoutes =() => {
    const routes = guestRoutes;

    return (
        <div className="flex flex-col w-full ">
            {
                routes.map((route) => (
                    <SidebarItems
                    key={route.href}
                    icon={route.icon}
                    label={route.Label}
                    href={route.href}
                    />
            )) }
        </div>
    )
}