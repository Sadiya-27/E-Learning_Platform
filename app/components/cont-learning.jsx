import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const ContinueLearning = () => {
    const { user, isLoaded, isSignedIn } = useUser();
    const userId = user?.id; // Get user ID
    const [courses, setCourses] = useState([]);
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
                const response = await axios.get(`/api/student/${userId}`);
                const { result } = response.data;
                console.log(result)

                // Check if enrolledCourses exists and is an array
                if (Array.isArray(result.enrolledCourses) && result.enrolledCourses.length) {
                    const coursePromises = result.enrolledCourses.map(async (course) => {
                        const courseResponse = await axios.get(`/api/course/${course.courseId}`);
                        const courseData = courseResponse.data.result;
                        console.log(courseData)

                        // Calculate total quizzes in the course by summing up all quizzes in each section
                        const totalQuizzes = courseData.sections ? courseData.sections.length : 0;

                        // Count user's completed quizzes for this course from the `quiz` array
                        const completedQuizzes = course.quiz ? course.quiz.length : 0;
                        console.log(completedQuizzes)

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

        if (isLoaded) {
            fetchCourses();
        }
        // } else if (!isSignedIn) {
        //     setError('User is not signed in');
        //     setLoading(false);
        //     router.push('/sign-in'); // Redirect to sign-in page if user is not signed in
        // }
    }, [userId, isLoaded, isSignedIn, router]); // Add dependencies

    if (loading) {
        return <div className="text-center p-4">Loading courses...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="flex flex-wrap justify-center m-4">
            {courses.map(course => (
                <div key={course._id} className="bg-white border rounded-xl shadow-lg m-4 p-4 w-80">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-44 object-cover rounded-lg" />
                    <h2 className="font-bold text-lg mt-2">{course.title}</h2>
                    <p className="text-gray-600 mt-2 mb-2">{course.description}</p>
                    <div className="w-full bg-gray-200 rounded-full h-5 mt-2">
                        <div
                            className="bg-indigo-600 h-5 rounded-full"
                            style={{ width: `${course.progress}%` }}
                        ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{course.progress}% completed</p>
                    <button 
                        onClick={() => router.push(`/course-page-student/${course._id}`)} 
                        className="bg-indigo-600 text-white rounded justify-center items-center py-1 px-4 mt-3 hover:bg-indigo-500"
                    >
                        Go to Course
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ContinueLearning;
