'use client'
import { useClerk, useUser   } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function MyCreatedCourses() {
  const router = useRouter();
  const { user } = useUser  ();
  const clerk = useClerk();
  const [courses, setCourses] = useState([]);

  // Fetch courses data from your backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let userId = clerk.user?.id;
        const userid = userId.toString();

        const response = await fetch('http://localhost:3000/api/course'); // Replace with your actual API route
        const data = await response.json();

        // Filter courses based on the logged-in user
        const userCourses = data.result.filter((course) => course.author[0].userId === userid);
        setCourses(userCourses);
      } catch (error) {
        toast.error('Error fetching courses:', error);
      }
    };

    if (user) {
      fetchCourses();
    }
  }, [user]);

  return (
    <div className="flex flex-wrap mx-auto p-4">
      <h2 className="text-2xl font-bold m-4 text-indigo-800 text-center justify-center items-center">My Created Courses</h2>
      <div className="flex flex-wrap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {courses.map((course) => (
          <div key={course._id} className="bg-white rounded-xl shadow-md p-4 pb-5">
            <img
              src={course.thumbnail} // Replace with your actual thumbnail URL
              alt={course.title}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="text-xl font-bold my-2">{course.title}</h3>
            <p className="text-gray-700 mb-4">{course.description}</p>
            <div className='items-center justify-center mx-auto px-20 md:px-28'>
                <Button onClick={() => router.push(`/create-course-chapt/${course._id}`)} className='hover:bg-indigo-500 bg-indigo-600 justify-center items-center mx-auto'>
                    View Course
                </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyCreatedCourses;