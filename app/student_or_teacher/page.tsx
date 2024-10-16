'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import {useClerk, useUser} from '@clerk/nextjs'
import { useRouter } from 'next/navigation'



export default function StudentTeacher(){

    const router = useRouter()
    const clerk = useClerk();
    const { user } = useUser();

    const name = `${user?.firstName} ${user?.lastName}`
    
    const user_Id = clerk.user?.id;

    const addStudent = async () =>{ 
        
        let result = await fetch("http://localhost:3000/api/student",{
            method: 'POST',
            body:JSON.stringify({name: name, userId: user_Id})
        });
        result = await result.json();
        if(result.success) {
            router.push('/student')
        }
    }

    const addEducator = async () =>{ 
        
        let result = await fetch("http://localhost:3000/api/teacher",{
            method: 'POST',
            body:JSON.stringify({name: name, userId: user_Id})
        });
        result = await result.json();
        if(result.success) {
            router.push('/teacher')
        }
    }


    return (
        <div className='bg-indigo-200 w-full h-full md:h-screen p-5'>
            <div className='flex items-center justify-center md:justify-center md:items-center md:flex sm:flex sm:justify-center sm:items-center pb-3 bg-indigo-200 mt-0'>
                    <Image src="/logo.png" alt='logo' height={250} width={250} />
            </div>
            <div className="flex flex-wrap rounded-xl p-5 bg-white w-full h-full md:h-96 md:w-1/2 md:mx-auto justify-center items-center mt-5 md:mt-10 mb-10">
                <h1 className='text-center text-indigo-600 text-3xl bg-white w-full mb-12 '>Which role describes you the best? </h1>
                <Button className="bg-indigo-600 hover:bg-indigo-500 m-4 p-10 py-20 text-2xl rounded-lg shadow-2xl" onClick={addStudent}>
                    <Image src='/student.png' width={100} height={100} alt='student' />
                    <h1 className='w-full text-center block px-5'>Student</h1>
                </Button>
                <Button className="bg-indigo-600 hover:bg-indigo-500 m-4 p-10 py-20 text-2xl rounded-lg shadow-2xl" onClick={addEducator}>
                    <Image src='/teacher.png' width={100} height={100} alt='student' />
                    <h1 className='w-full text-center block px-5'>Educator</h1>
                </Button>
            </div>
        </div>
    )
}