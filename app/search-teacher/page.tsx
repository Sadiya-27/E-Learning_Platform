import ExploreCoursesPage from '@/app/components/explore-course-page';
import Footer from '@/app/components/Footer-dashboard'
import TeacherHomePage from '../components/teacher-layout';

const SearchPage = () => {
    return(
        <div>
            <TeacherHomePage>
                <div className='mt-20 sm:mt-30'>
                    <ExploreCoursesPage/>
                </div>
            </TeacherHomePage>
            <div className='md:ml-56'>
                <Footer />
            </div>
        </div>
    )
}

export default SearchPage;