import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'


export default function Page() {
    return (
        <div className='bg-indigo-200 h-full md:h-screen w-screen  '>
            <div className='flex items-center justify-center md:justify-center md:items-center md:flex sm:flex sm:justify-center sm:items-center pb-3'>
                    <Image src="/logo.png" alt='logo' height={250} width={250} />
            </div>
            
                <div className='flex justify-center items-center sm:justify-center  sm:items-center sm:flex md:items-center md:justify-center md:flex pb-10 h-full bg-indigo-200'>
                    <SignUp 
                        appearance={{
                            variables:{
                                colorPrimary: '#6c47ff',
                            }
                        }}
                        forceRedirectUrl='/student_or_teacher'    
                    />
                </div>
                
            </div>
    )
    
        
}