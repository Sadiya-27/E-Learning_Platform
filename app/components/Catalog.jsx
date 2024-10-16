import Head from 'next/head';
import Card from '../components/card';

const courses = [
    {
        id: 1,
        title: 'Course 1',
        description: 'This is a description of Course 1This is a description of Course 1This is a description of Course 1This is a description of Course 1This is a description of Course 1This is a description of Course 1This is a description of Course 1This is a description of Course 1',
        image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        id: 2,
        title: 'Course 2',
        description: 'This is a description of Course 2This is a description of Course 2This is a description of Course 2This is a description of Course 2This is a description of Course 2This is a description of Course 3This is a description of Course 3This is a description of Course 3',
        image: 'https://images.unsplash.com/photo-1602265568624-29e8dc535bd6?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        id: 3,
        title: 'Course 3',
        description: 'This is a description of Course 3This is a description of Course 3This is a description of Course 3This is a description of Course 3This is a description of Course 3This is a description of Course 3This is a description of Course 3',
        image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        id: 4,
        title: 'Course 4',
        description: 'This is a description of Course 4This is a description of Course 3This is a description of Course 3This is a description of Course 3This is a description of Course 3This is a description of Course 3This is a description of Course 3',
        image: 'https://images.unsplash.com/photo-1602265568624-29e8dc535bd6?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    
    // Add more courses to the array
];
const Catalog = () => {
    return(
            <div>
        <Head>
            <title>Course Catalog</title>
        </Head>
        
        <div className=" flex w-full p-3 rounded flex-wrap md:flex-nowrap">
            {courses.map((course) => (
            <Card key={course.id} course={course} />
            ))}
        </div>
        </div>
    )
}

export default Catalog