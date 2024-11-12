'use client';

import { useState, useEffect } from 'react';
import { useClerk, useUser   } from '@clerk/nextjs';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import toast from 'react-hot-toast';

// Register necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const CourseCompletion = () => {
    const { user } = useUser  ();
    const clerk = useClerk();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const userId = clerk.user?.id;
                if (!userId) {
                    toast.error('User  not found.');
                    return;
                }

                const response = await fetch('/api/course');
                if (!response.ok) {
                    throw new Error('Error fetching courses.');
                }

                const data = await response.json();
                if (!data.result) {
                    throw new Error('No courses available for the user.');
                }

                const userCourses = data.result.filter(course => course.author[0]?.userId === userId);

                const updatedCourses = await Promise.all(userCourses.map(async (course) => {
                    const courseId = course._id;

                    // Fetch course sections
                    const coursesections = await fetch(`/api/course/${courseId}`);
                    if (!coursesections.ok) {
                        throw new Error('Error fetching course sections.');
                    }
                    const courseSections = await coursesections.json();
                    const quizzes = Array.isArray(courseSections.result.sections) ? courseSections.result.sections.length : 0;

                    // Fetch the students enrolled in the course
                    const studentResponse = await fetch(`/api/courseCompletion/${courseId}`);
                    if (!studentResponse.ok) {
                        throw new Error(`Error fetching student data for course ${courseId}`);
                    }

                    const studentData = await studentResponse.json();

                    // Check if studentData has results
                    if (!studentData || !studentData.result) {
                        return {
                            ...course,
                            completedQuizzes: 0,
                            studentsCompleted: 0,
                            quizzes: quizzes, // Include the total quizzes
                            completionRate: 0, // Default to 0% if no quizzes
                        };
                    }

                    const totalQuizzesCompleted = studentData.result.reduce((acc, student) => acc + student.totalQuizzesCompleted, 0);
                    const uniqueStudents = new Set(studentData.result.map(student => student.studentId)).size; // Assuming studentId is unique for each student

                    // Calculate completion rate as a percentage
                    const completionRate = quizzes > 0 ? ((totalQuizzesCompleted / (quizzes * uniqueStudents)) * 100).toFixed(2) : 0;

                    return {
                        ...course,
                        completedQuizzes: totalQuizzesCompleted,
                        studentsCompleted: uniqueStudents,
                        quizzes: quizzes, // Include the total quizzes
                        completionRate: completionRate, // Include the completion rate
                    };
                }));

                setCourses(updatedCourses);
            } catch (error) {
                toast.error(error.message);
                setError('Failed to fetch courses');
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchCourses();
        }
    }, [user, clerk.user]);

    // Define a color palette for the pie chart
    const colorPalette = [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40',
        '#FF5733',
        '#33FF57',
        '#3357FF',
        '#FF33A8'
    ];

    // Prepare chart data for the pie chart
    const chartData = {
        labels: courses.flatMap(course => [
            `${course.title} - Completed`,
            `${course.title} - Remaining`
        ]),
        datasets: [
            {
                label: 'Quizzes',
                data: courses.flatMap(course => [
                    course.completedQuizzes, 
                    course.quizzes - course.completedQuizzes
                ] ),
                backgroundColor: courses.flatMap((_, index) => [
                    colorPalette[index % colorPalette.length], // Color for completed quizzes
                    '#CCCCCC' // Color for remaining quizzes (gray)
                ]),
            }
        ]
    };

    if (loading) {
        return <div className="text-center p-4">Loading courses...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="flex flex-wrap mx-auto p-4 bg-sky-200 rounded-xl">
            <h1 className="text-2xl font-bold m-4 text-sky-600 text-center">Course Completion Analytics</h1>
            <div className="w-full md:w-1/2 mx-auto">
                <Pie data={chartData} className='bg-white p-1 md:p-5 h-96 w-96 md:w-full rounded-xl shadow-lg my-auto' />
            </div>
            <div className="mt-4">
                <h2 className="text-xl font-semibold text-center text-sky-700">Course Completion Details</h2>
                <ul className="list-disc list-inside ml-3">
                    {courses.map(course => (
                        <li key={course._id} className='text-sky-700 text-lg p-2'>
                            {course.title}: {course.completedQuizzes} quizzes completed by {course.studentsCompleted} students out of total quizzes: {course.quizzes}. Completion Rate: {course.completionRate}%.
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CourseCompletion;