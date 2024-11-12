
import Banner from '../components/landing-banner';
import Layout from '../components/layout';
import  Catalog  from '../components/Catalog'
import Card from '../components/card';
import Goals from '../components/goal'
import Footer from '../components/footer'
import Link from 'next/link';

function CourseLandingPage() {

    console.log("hit course landing page.jsx")
    return (
        

            <div className='m-0 p-0'>
                <Layout >
                    
                </Layout>
                <div className="">
                    <Banner />
                </div>
                <div>

                </div>
                <div className='md:m-8 m-4 mt-10 p-2 border rounded-xl shadow-2xl flex-auto justify-center items-center catalog'>
                    <h1 className='items-center text-indigo-800 font-bold text-3xl text-center pt-10 px-3'>Explore our collection </h1>
                    <Catalog>
                        <Card/>
                    </Catalog>
                </div>
                <div className='px-8'>
                    <Goals />
                </div>
                <div className='mt-14'>
                    <Footer/>
                </div>
                {/* <Link href='/student_or_teacher'>Role</Link> */}
            </div>
        
    );
}

export default CourseLandingPage;