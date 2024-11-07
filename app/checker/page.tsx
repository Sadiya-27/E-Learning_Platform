'use client'
import { Student } from '@/utils/model/student';
import { useClerk, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast'

export default function Checking() {

    const { user } = useUser();
    const clerk = useClerk();
    const router = useRouter();
    try {
        const getUsers = async () => {
            let userId = user?.id;
            if (userId) {
                const userid = userId.toString();

                let findStudent  = await fetch(`http://localhost:3000/api/student`);
                findStudent  = await findStudent.json();
                const foundStudent  = findStudent.result.find((user) => user.userId === userid);

                let findTeacher  = await fetch(`http://localhost:3000/api/teacher`);
                findTeacher  = await findTeacher.json();
                const foundTeacher  = findTeacher.result.find((user) => user.userId === userid);
        
                if (foundStudent ) {
                router.push('/student');
                } 
                if(foundTeacher) {
                    router.push('/teacher');
                }
                toast.success("Login success")
            } else {
                // handle the case where userId is null or undefined
                // toast.error("Please login to access this page.");
            }
            };
            getUsers();
        } catch (error) {
            toast.error("something went wrong.");
        }

    return (
        <div className='bg-indigo-200 h-full w-screen'>

            <div className='w-full h-screen bg-indigo-200 text-center justify-center items-center mt-0 '>
                <div className='bg-indigo-200'>
                    <h1 className='mx-auto my-auto text-3xl text-indigo-600 pt-80'>Please wait a moment...</h1>

                </div>
            </div>
        </div>
    )
}