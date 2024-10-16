import  DashboardLayout  from '@/app/components/student-layout'
import ExploreCoursesPage from '@/app/components/explore-course-page';
import Footer from '@/app/components/Footer-dashboard'

const SearchPage = () => {
    return(
        <div>
            <DashboardLayout>
                <div className='mt-20 sm:mt-30'>
                    <ExploreCoursesPage/>
                </div>
            </DashboardLayout>
            <div className='md:ml-56'>
                <Footer />
            </div>
        </div>
    )
}

export default SearchPage;