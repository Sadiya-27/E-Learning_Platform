import { UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation';


export const NavbarRoutes = () => {

    return (
        <div className="flex gap-x-2 ml-auto">
            <Link href='/student' className='mr-5 text-indigo-600 text-xl font-medium'>Home</Link>
            <Link href='/search' className='mr-5 text-indigo-600 text-xl font-medium'>Explore Courses</Link>

            <UserButton 
                afterSignOutUrl='/'
            />
        </div>

    )
}