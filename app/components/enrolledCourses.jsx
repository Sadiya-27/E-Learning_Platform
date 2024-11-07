import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import CourseCard from '@/app/components/courseCard-dashboard'; // Assuming CourseCard component is already created

const EnrolledCourses = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const userId = user?.id; // Get user ID
  const [courses, setCourses] = useState([]); // Remove the TypeScript type annotation here
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      if (!userId) {
        setError('User ID is not defined');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/api/student/${userId}`); // Fetch student data (including enrolled courses)
        const { result } = response.data;
        

        // Check if enrolledCourses exists and is an array
        if (Array.isArray(result.enrolledCourses) && result.enrolledCourses.length) {
          const coursePromises = result.enrolledCourses.map(async (enrolledCourse) => {
            const courseResponse = await axios.get(`/api/course/${enrolledCourse.courseId}`);
            const courseData = courseResponse.data.result;
            

            // Calculate total quizzes in the course by summing up all quizzes in each section
            const totalQuizzes = courseData.sections ? courseData.sections.length : 0;

            // Count user's completed quizzes for this course from the `quiz` array
            const completedQuizzes = enrolledCourse.quiz ? enrolledCourse.quiz.length : 0;
            

            // Calculate progress as a percentage
            const progress = totalQuizzes ? (completedQuizzes / totalQuizzes) * 100 : 0;

            return {
              ...courseData,
              progress: Math.round(progress), // Round the progress
            };
          });

          const courseDetails = await Promise.all(coursePromises);
          setCourses(courseDetails);
        } else {
          setError('No enrolled courses found');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    if (isLoaded && isSignedIn) {
      fetchCourses();
    } 
    //else if (!isSignedIn) {
    //   setError('You need to sign in to view your courses');
    //   setLoading(false);
    //   router.push('/sign-in'); // Redirect to sign-in page if the user is not signed in
    // }
  }, [userId, isLoaded, isSignedIn, router]); // Add dependencies

  if (loading) {
    return <div className="text-center p-4">Loading enrolled courses...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-wrap justify-center m-4 gap-6"> {/* Added gap-6 to create spacing between cards */}
      {courses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
};

export default EnrolledCourses;
