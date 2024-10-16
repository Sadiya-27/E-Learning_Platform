'use client';
import StudentPage from '@/app/components/student-layout';
import Image from 'next/image';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useUser , useClerk } from '@clerk/nextjs';
import { Clock, Tag, BarChart, CreditCard, Languages, FileBadge, Blocks, ChevronDown, ChevronUp, SquarePlay, Folder } from 'lucide-react';
import toast from 'react-hot-toast';
import { Student } from '../../../utils/model/student';
import { useRouter } from 'next/navigation'
import Footer from '@/app/components/Footer-dashboard'

interface Course {
    title: string;
    description: string;
    thumbnail: string;
    duration: string;
    category: string;
    level: string;
    overview: string;
    skills: string;
    sections: Section[];
}

interface Section {
    title: string;
    description: string;
    chapters: Chapter[];
}

interface Chapter {
    title: string;
    description: string;
    videoUrl: string;
}

export default function CourseDetailPage({ params }: { params: { courseId: string } }) {
    const router =useRouter();
    const [course, setCourse] = useState<Course | null>(null);
    const [expandedSections, setExpandedSections] = useState<number[]>([]);
    const { user } = useUser(); // Get user information from Clerk
    const clerk = useClerk();
    // Fetch course details when the component mounts or courseId changes
    useEffect(() => {
        axios.get(`/api/course/${params.courseId}`)
            .then(response => {
                const courseData = response.data.result;
                setCourse(courseData);
            })
            .catch(error => {
                console.error('Error fetching course details:', error);
                toast.error('Could not fetch course details. Please try again later.');
            });
    }, [params.courseId]);

    // Toggle section expansion in the course outline
    const toggleSection = (index: number) => {
        setExpandedSections((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    // Handle course enrollment
    const handleEnroll = async () => {
        if (!user) {
            toast.error('You need to be logged in to enroll in this course.');
            router.push('/');
            return;
        }
    
            const userid = clerk.user?.id;
        try {
            // Make a GET request to your API to find the student by userId
            const response = await fetch('/api/student');
            const findStudent  = await response.json();
            const foundStudent  = findStudent.result.find((user) => user.userId === userid);
    
            if (foundStudent) {
                // Make a PATCH request to your API to update the student's enrolled courses
                await fetch(`/api/student?userId=${userid}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        courseId: params.courseId,
                        title: course?.title // Send course title for the student's record
                    })
                });
    
                toast.success('You have been successfully enrolled in the course.');
            } else {
                toast.error('Student not found');
                router.push('/')
            }
        } catch (error) {
            console.error('Enrollment failed:', error);
            toast.error('There was an error enrolling in the course. Please try again later.');
        }
    };

    return (
        <StudentPage>
            <div className='mt-10 py-10 h-full w-full bg-indigo-200'>
                {course && (
                    <div>
                        <div className='mx-auto justify-center md:justify-start md:mx-10 mb-5 md:mb-10 flex flex-wrap'>
                            <Image src={course.thumbnail} alt={course.title} width={300} height={200} className='rounded-md shadow-xl' />
                            <div className='flex flex-col justify-center mx-6 mb-5 mt-5 md:ml-10'>
                                <h1 className='text-3xl font-bold text-indigo-700'>{course.title}</h1>
                                <p className='text-xl font-medium text-slate-700 mt-3'>{course.description}</p>
                                <Button onClick={handleEnroll} className='mt-5 bg-indigo-600 hover:bg-indigo-500 text-lg py-2 px-4'>Enroll</Button>
                            </div>
                        </div>
                        <div className='flex flex-wrap bg-slate-100 rounded-lg justify-center items-center p-5 md:justify-start mt-5 md:mx-10 shadow-xl mx-6'>
                            <h2 className='text-2xl font-bold text-indigo-700 mb-3'>Learning Progress</h2>
                            <div className='flex flex-wrap h-5 w-full bg-indigo-300 rounded-full mb-2 mx-5'>
                                <div className='h-full bg-indigo-600 rounded-full' style={{ width: '20%' }}></div>
                            </div>
                        </div>
                        <div className='mt-6 md:mt-10 md:mx-16 mx-8'>
                            <h1 className='text-2xl text-indigo-700 mb-5 font-semibold'>Overview</h1>
                            <div className='flex items-center mb-3 ml-3'>
                                <Clock className='mr-3 text-slate-700' />
                                <h2 className='text-xl text-slate-700 font-medium'>Duration: {course.duration}</h2>
                            </div>
                            <div className='flex items-center mb-3 ml-3'>
                                <Tag className='mr-2 text-slate-700' />
                                <h2 className='text-xl text-slate-700 font-medium'>Category: {course.category}</h2>
                            </div>
                            <div className='flex items-center mb-3 ml-3'>
                                <BarChart className='mr-2 text-slate-700' />
                                <h2 className='text-xl text-slate-700 font-medium'>Level: {course.level}</h2>
                            </div>
                            <div className='flex items-center mb-3 ml-3'>
                                <CreditCard className='mr-2 text-slate-700' />
                                <h2 className='text-xl text-slate-700 font-medium'>Free</h2>
                            </div>
                            <div className='flex items-center mb-5 ml-3'>
                                <Languages className='mr-2 text-slate-700' />
                                <h2 className='text-xl text-slate-700 font-medium'>English</h2>
                            </div>
                            <div className='flex items-center mb-2 ml-3'>
                                <Blocks className='mr-2 text-slate-700' />
                                <h2 className='text-xl text-slate-700 font-medium'>What you will Learn?</h2>
                            </div>
                            <div className='flex items-center mb-5 ml-3 md:ml-10'>
                                <h2 className='text-xl font-medium text-slate-700'>{course.overview}</h2>
                            </div>
                            <div className='flex items-center mb-10 ml-3'>
                                <FileBadge className='mr-2 text-slate-700' />
                                <h2 className='text-xl text-slate-700 font-medium'>Skills you will gain:</h2>
                                <h2 className='text-xl text-slate-700 font-medium md:ml-3 md:mt-0 ml-0 mt-1'>{course.skills}</h2>
                            </div>
                        </div>
                        <div className='mx-6 mt-5 md:mx-10 bg-slate-100 flex flex-wrap p-5 rounded-lg shadow-lg'>
                            <h2 className='text-2xl text-indigo-700 mb-5 font-semibold'>Table of Contents</h2>
                            <div className='w-full'>
                                {course.sections.map((section, sectionIndex) => (
                                    <div key={sectionIndex} className='mb-5'>
                                        <div className='flex justify-between items-center cursor-pointer border-b rounded-md border-slate-300 px-2 transition-all duration-1000' onClick={() => toggleSection(sectionIndex)}>
                                            <div className='flex items-center'>
                                                <Folder className='text-slate-500 mr-2'/>
                                                <h3 className='text-xl font-bold text-indigo-700'>{section.title}</h3>
                                            </div>
                                            {expandedSections.includes(sectionIndex) ? (
                                                <ChevronUp className='text-indigo-700' />
                                            ) : (
                                                <ChevronDown className='text-indigo-700' />
                                            )}
                                        </div>
                                        {expandedSections.includes(sectionIndex) && (
                                            <div className='ml-4 transition-all duration-300'>
                                                <p className='text-md text-slate-700 mb-3'>{section.description}</p>
                                                {section.chapters.map((chapter, chapterIndex) => (
                                                    <div key={chapterIndex} className='mb-2 flex items-center'>
                                                        <SquarePlay className='mr-2 text-indigo-700 w-6 h-6' />
                                                        <div>
                                                            <h4 className='text-lg font-medium text-slate-700 pt-4'>{chapterIndex + 1}. {chapter.title}</h4>
                                                            <p className='text-sm text-slate-500'>{chapter.description}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer/>
        </StudentPage>
    );
}
