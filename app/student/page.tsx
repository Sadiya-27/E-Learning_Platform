'use client'
import Image from 'next/image'
import RecommendedCourses from '@/app/components/recommended-courses'
import ContinueLearning from '@/app/components/cont-learning'
import Footer from '@/app/components/Footer-dashboard'
import Faq from '@/app/components/faq'
import { useUser } from '@clerk/nextjs'
import DashboardLayout from '@/app/components/student-layout'


export default function Home(){
    const { user } = useUser();
    const userId = user?.id;


    return (
        <div>
            <DashboardLayout>
                    <div className='flex flex-wrap h-300 w-[1/2] mx-4 shadow-md bg-blue-200 mt-20 md:mr-10 sm:mx-2 md:ml-10 rounded-3xl pl-2 pb-5 '>
                        <Image src='/mascot.png' alt='mascot' height={150} width={150} className=''/>
                        {user?.firstName && user.lastName ? (
                        <h1 className='mx-6 md:ml-10 md:mt-14 font-bold text-indigo-600 text-center text-2xl'>Welcome {user.firstName} {user.lastName} !</h1>):(
                            <div>
                                <h1 className='ml-10 mt-14 font-bold text-indigo-600 text-center text-2xl'>Welcome !</h1>
                            </div>
                        )}
                    </div>
                    <div className='flex flex-wrap mx-4  justify-center mb-10 bg-indigo-300 h-400 mt-14 w-[1/2] rounded-lg  md:mr-10 md:ml-10 p-3 '>
                        <h1 className=' mt-2 font-bold text-indigo-700 text-center md:text-left text-2xl'>Continue Learning</h1>
                        <ContinueLearning className='mt-5'/>
                    </div>
                    <div className='flex flex-wrap mx-4 bg-sky-100 h-400 mt-14 w-[1/2] rounded-lg  md:mr-10  md:ml-10 p-3  text-center justify-center mb-10'>
                        <h1 className=' mt-2 font-bold text-sky-700 text-center text-2xl'>Recommended Courses</h1>
                        <RecommendedCourses />
                    </div>
                    <div className='flex flex-wrap h-400 mt-14 w-[1/2] bg-indigo-50 md:ml-0 text-left justify-start p-2 mb-20'>
                        <Faq />
                    </div>
                    <div className='md:ml-0'>
                        <Footer />
                    </div>
            </DashboardLayout>
        </div>
    )
}