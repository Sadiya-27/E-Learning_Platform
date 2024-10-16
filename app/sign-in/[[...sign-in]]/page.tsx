import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'


export default function Page() {
    console.log("hit sign-in page")


    return (
        <div className='bg-indigo-200 h-screen w-screen md:w-screen max-xl:bg-inherit lg:h-full lg:bg-inherit  xl:h-full xl:bg-inherit md:h-full  '>
            <div className='flex items-center justify-center md:justify-center md:items-center md:flex sm:flex sm:justify-center sm:items-center pb-3 bg-indigo-200 mt-0'>
                    <Image src="/logo.png" alt='logo' height={250} width={250} />
            </div>
                
                <div className='flex justify-center items-center sm:justify-center  sm:items-center sm:flex md:items-center md:justify-center md:flex bg-indigo-200'>
                    
                    <SignIn 
                        appearance={{
                            variables:{
                                colorPrimary: '#6c47ff',
                            },
                        }}
                        forceRedirectUrl='/checker'
                    />
                </div>
                <div className='bg-indigo-200 h-32 w-screen'>

                </div>
            </div>
        
    )
}