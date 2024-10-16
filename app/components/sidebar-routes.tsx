'use client'
import {Layout, Compass,House ,Settings} from 'lucide-react'
import {SidebarItems} from '@/app/components/sidebar-item'

const guestRoutes= [
    {
        icon: House,
        Label : "Home",
        href: "/student"
    },
    {
        icon: Compass,
        Label : "Explore Courses",
        href: "/search"
    },
    {
        icon: Layout,
        Label : "Dashboard",
        href: "/student-dashboard"
    },
    {
        icon: Settings,
        Label : "Settings",
        href: "/student-profile"
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