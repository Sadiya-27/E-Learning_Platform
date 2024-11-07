'use client'
import DashboardLayout from '@/app/components/student-layout'
import EnrolledCourses  from '@/app/components/enrolledCourses'
import StudentGrades from '@/app/components/grades-student'
import Footer from '@/app/components/Footer-dashboard'

export default function Dashboard() {
    return (
        <div>
            <DashboardLayout>
                <div className='flex flex-wrap rounded-lg bg-indigo-200 mt-20 mx-6 md:mx-8'>
                <h1 className="text-2xl font-bold text-indigo-800 m-4  mx-auto my-auto pt-4">Enrolled Courses</h1>
                    <EnrolledCourses/>
                </div>
                <div className='flex flex-wrap rounded-lg bg-blue-200 mt-10 mx-6 md:mx-8'>
                    <h1 className="text-2xl font-bold text-blue-800 m-4  mx-auto my-auto pt-4">Grades</h1>
                    <StudentGrades/>
                </div>
                <div>
                    <Footer/>
                </div>
            </DashboardLayout>
        </div>
    )
}