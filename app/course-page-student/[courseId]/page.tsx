'use client';
import { Navbar } from '@/app/components/course-navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Folder, FolderOpen, Youtube, Menu, X } from 'lucide-react';
import QuizPopup from '@/app/components/quiz-popup';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';

export default function CoursePage({ params }: { params: { courseId: string } }) {
    const { user } = useUser();
    const userId = user?.id;
    const [course, setCourse] = useState<Course | null>(null);
    const [sections, setSections] = useState<Section[]>([]);
    const [selectedChapter, setSelectedChapter] = useState<{ title: string; videoUrl: string; description: string } | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());
    const [isQuizOpen, setIsQuizOpen] = useState(false);
    const [currentQuiz, setCurrentQuiz] = useState<{ question: string; options: { option: string }[]; answer: string }[]>([]);
    const [student, setStudent] = useState<Student | null>(null);
    const [currentSectionId, setCurrentSectionId] = useState<string | null>(null);

    useEffect(() => {
        axios.get(`/api/course/${params.courseId}`)
            .then(response => {
                const courseData = response.data.result;
                setCourse(courseData);
                const sectionsData = courseData.sections.map((section) => ({
                    _id: section._id, 
                    title: section.title,
                    description: section.description,
                    chapters: section.chapters.map((chapter) => ({
                        title: chapter.title,
                        videoUrl: chapter.videoUrl,
                        description: chapter.description,
                    })),
                    quiz: section.quiz.length > 0 ? section.quiz : [{ question: '', options: [{ option: '' }], answer: '' }],
                    
                }));

                setSections(sectionsData);

                if (!selectedChapter && sectionsData.length > 0 && sectionsData[0].chapters.length > 0) {
                    setSelectedChapter(sectionsData[0].chapters[0]);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, [params.courseId, selectedChapter]);

    useEffect(() => {
        if (userId) {
            axios.get(`/api/student/${userId}`)
                .then(response => {
                    const studentData = response.data.result;
                    setStudent(studentData);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [userId]);

    const handleChapterSelect = (chapter: { title: string; videoUrl: string; description: string }) => {
        setSelectedChapter(chapter);
    };

    const toggleSection = (index: number) => {
        const newExpandedSections = new Set(expandedSections);
        if (newExpandedSections.has(index)) {
            newExpandedSections.delete(index);
        } else {
            newExpandedSections.add(index);
        }
        setExpandedSections(newExpandedSections);
    };

    const openQuiz = (quiz: { question: string; options: { option: string }[]; answer: string }[], sectionId : string) => {
        setIsQuizOpen(true);
        setCurrentQuiz(quiz);
        setCurrentSectionId(sectionId);
    };
    
    const closeQuiz = () => {
        setIsQuizOpen(false);
        setCurrentQuiz([]); // Reset the current quiz
        setCurrentSectionId(null);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                className="md:hidden p-4 text-slate-800 left-1 top-30 z-10" // Adjusted position
            >
                {isSidebarOpen ? <X /> : <Menu />}
            </button>
            <div className="flex flex-1">
                <div className={`md:mt-0 h-full md:fixed md:w-64 border-r shadow-md ${isSidebarOpen ? 'block' : 'hidden md:block'} h-full md:pb-32`}>
                    <div className="md:pt-4 h-full overflow-y-auto"> {/* Added overflow-y-auto */}
                        {sections.map((section, index) => (
                            <div key={index} className="mb-4">
                                <h2
                                    className="text-lg text-indigo-600 font-bold p-4 cursor-pointer flex items-center"
                                    onClick={() => toggleSection(index)}
                                >
                                    <span className="mr-2">
                                        {expandedSections.has(index) ? <FolderOpen /> : <Folder />}
                                    </span>
                                    {section.title}
                                    <span className="ml-2">
                                        {expandedSections.has(index) ? <ChevronUp /> : <ChevronDown />}
                                    </span>
                                </h2>
                                {expandedSections.has(index) && section.chapters.map((chapter, chapterIndex) => (
                                    <Link
                                        key={chapterIndex}
                                        href="#"
                                        onClick={() => handleChapterSelect(chapter)}
                                        className={`flex items-center block p-4  
                                            ${selectedChapter?.title === chapter.title ? 'bg-indigo-200 text-indigo-600 border-r-4 border-indigo-600' : 'text-slate-500 hover:bg-slate-200'}`}
                                    >
                                        <span className='mr-2 flex items-center'>
                                            <Youtube />
                                        </span>
                                        {chapter.title}
                                    </Link>
                                ))}
                                {expandedSections.has(index) && section.quiz.length > 0 && (
                                    <div className=''>
                                        <Button
                                            onClick={() => openQuiz(section.quiz, section._id)}
                                            className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 mx-20 mt-4"
                                        >
                                            Take Quiz
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={`flex-1 mt-7 md:mt-0 p-4 ${isSidebarOpen ? 'ml-6' : 'ml-0'} md:ml-72`}>
                    {selectedChapter ? (
                        <div className='mb-8'>
                            <h3 className='text-2xl text-indigo-600 font-semibold'>{selectedChapter.title}:</h3>
                            <p className='text-lg text-gray-500 mt-3 mb-5'>{selectedChapter.description}</p>
                            <video
                                controls
                                className='md:w-2/3 w-full mx-auto mt-5 rounded-lg'
                                src={selectedChapter.videoUrl}
                                width="600"
                                height="400"
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    ) : (
                        <p className='text-gray-600'>Please select a chapter to view its content.</p>
                    )}
                </div>
            </div>
            {isQuizOpen && selectedChapter && (
                <QuizPopup 
                    quiz={currentQuiz} 
                    onClose={closeQuiz} 
                    courseId={params.courseId} 
                    courseTitle={selectedChapter.title} // Pass chapter title
                    sectionName={sections.find(section => section.chapters.find(chapter => chapter.title === selectedChapter.title))?.title} // Pass section name
                    userId={userId}
                    sectionId={currentSectionId} // Pass userId correctly
                />
            )}
        </div>
    );
}
