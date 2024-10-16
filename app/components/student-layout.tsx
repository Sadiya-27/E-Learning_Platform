import Sidebar from '@/app/components/sidebar'
import { SignedIn,UserButton } from '@clerk/nextjs';
import { Navbar } from '@/app/components/navbar'
import { SWRConfig } from 'next/swr';
import Footer from '@/app/components/footer'

const DashboardStudent = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    
    <div>

              <header>
                      
                      <SignedIn>
                        <UserButton 
                        signInUrl='/sign-in'
                        afterSignOutUrl='/' />
                      </SignedIn>
              </header>
        <div className="h-full">
            <div className='h-[80px] md:pl-56 fixed inset-y-0 w-full z-50'>
              <Navbar/>

            </div>
            <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
              <Sidebar/>
            </div>
        </div>
        <main className='md:pl-56 h-full'>
          {children}

        </main>
      </div>
    
    
  )
}

export default DashboardStudent;