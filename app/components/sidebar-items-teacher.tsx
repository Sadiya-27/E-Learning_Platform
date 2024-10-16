"use client"
import { LucideIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation'
import { cn }from '@/lib/utils'

interface SidebarItemsProps{
    icon: LucideIcon,
    label:string,
    href : string,

}

export const SidebarItems =({
    icon: Icon,
    label,
    href ,
}: SidebarItemsProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const isActive = (pathname === "/teacher" && href ==="/teacher") || pathname ===href || pathname?.startsWith(`/${href}/`)

    const onClick = () => {
        router.push(href);
    }

    return (
        <button
            onClick={onClick}
            type='button'
            className={cn(
                "flex items-center gap-x-2 test-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20 ",
                isActive && "text-indigo-700 bg-indigo-200 hover:bg-indigo-200 hover:text-indigo-700"
            )}
        >
            <div className='flex items-center gap-x-2 py-4'>
                <Icon 
                    size={22}
                    className={cn(
                        "text-slate-700",
                        isActive && "text-indigo-700"
                    )}
                />
                {label}
            </div>
            <div
                className={cn(
                    "ml-auto opacity-0 border-2 border-indigo-700 h-full transition-all",
                    isActive && "opacity-100"
                )}
            />
        </button>
    )
}