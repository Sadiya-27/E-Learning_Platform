'use client'
import TeacherHomePage from "../components/teacher-layout";
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import MyCreatedCourses from '@/app/components/created-courses'
import Footer from '@/app/components/Footer-dashboard'


export default function Home(){
    const { user } = useUser();

    return(
        <TeacherHomePage>
            <div>
            <div className='flex flex-wrap h-300 w-[1/2] mx-5 md:mx-6 shadow-md bg-blue-200 mt-20 md:mr-10 md:ml-10 rounded-3xl pl-2 pb-5 '>
                <Image src='/mascot.png' alt='mascot' height={150} width={150} className=''/>
                {user?.firstName && user.lastName ? (
                <h1 className='mx-6 mt-0 md:mt-14 font-bold text-indigo-600 text-center text-2xl'>Welcome {user.firstName} {user.lastName} !</h1>):(
                    <div>
                        <h1 className='ml-10 mt-14 font-bold text-indigo-600 text-center text-2xl'>Welcome !</h1>
                    </div>
                )}
            </div>
            <div className="flex flex-wrap mx-4 md:mx-6 bg-indigo-200 mt-10 md:mr-10 md:ml-10 rounded-3xl pl-2 pr-2 pb-5 justify-center items-center">
                <MyCreatedCourses/>
            </div>
            <div>
                <Footer/>
            </div>
            </div>
        </TeacherHomePage>
    )
}