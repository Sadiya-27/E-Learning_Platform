import { UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation';


export const NavbarRoutes = () => {
    const homePage = usePathname('/student');

    return (
        <div className="flex gap-x-2 ml-auto">
            {/* {homePage === '/student' && <Link href='/teacher'><Button className='bg-indigo-600 hover:bg-indigo-500'>Teach on FutureSelf</Button></Link> } */}
            {/* {homePage === '/teacher' && <Link href='/student'><Button className='bg-indigo-600 hover:bg-indigo-500'>Exit teacher mode</Button></Link> } */}
            <UserButton 
                afterSignOutUrl='/'
            />
        </div>

    )
}