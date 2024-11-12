'use client'

import TeacherHomePage from '@/app/components/teacher-layout'
import EnrolledUsers from '@/app/components/enrolledAnalytics'
import CourseCompletion from '@/app/components/courseCompletion'
import Footer from '@/app/components/Footer-dashboard'

export default function TeacherDasboard() {
    return(
        <div>
            <TeacherHomePage>
                <div className=' mt-20 mx-4 md:mx-8'>
                    <EnrolledUsers/>
                </div>
                <div className='mt-10 mx-4 md:mx-8'>
                    <CourseCompletion/>
                </div>
                <div>
                    <Footer/>
                </div>
            </TeacherHomePage>
        </div>
    )
}
