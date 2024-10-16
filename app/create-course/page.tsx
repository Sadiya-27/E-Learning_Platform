'use client'

import TeacherHomePage from "../components/teacher-layout";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'
import MyCreatedCourses from '@/app/components/created-courses'
import Footer from '@/app/components/Footer-dashboard'


const Course = () => {

  const router = useRouter();

  return (
    <div>
      <TeacherHomePage>
        <div className="mt-20 ml-6 md:ml-10">
          <Button onClick={() => { router.push('/create-new-course')}} className="bg-indigo-600 hover:bg-indigo-500 text-lg py-2 px-4">Create New Course</Button>
        </div>
        <div className="flex flex-wrap mx-4 md:mx-6 bg-indigo-200 mt-10 md:mr-10 md:ml-10 rounded-3xl pl-2 pr-2 pb-5 justify-center items-center">
                <MyCreatedCourses/>
        </div>
        <div>
          <Footer/>
        </div>
      </TeacherHomePage>
    </div>
  )
}

export default Course;