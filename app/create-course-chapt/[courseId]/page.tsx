'use client'
import axios from 'axios';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import TeacherHomePage from '@/app/components/teacher-layout';
import Image from 'next/image';
import { UploadButton } from "@/utils/uploadthing";
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';

interface Course {
    title: string;
    description: string;
    thumbnail: string;
    overview: string;
    skills: string;
    sections: Section[];
}

interface QuizOption {
    option: string;
}

interface Quiz {
    question: string;
    options: QuizOption[];
    answer: string;
}

interface Section {
    title: string;
    description: string;
    chapters: Chapter[];
    quiz: Quiz[];
}

interface Chapter {
    title: string;
    description: string;
    videoUrl: string;
}

export default function CreateChapterPage({ params }: { params: { courseId: string } }) {
    const [course, setCourse] = useState<Course | null>(null);
    const [sections, setSections] = useState<Section[]>([]);
    const [numSections, setNumSections] = useState(1);
    const [numChapters, setNumChapters] = useState<number[]>([1]);
    const [numQuizQuestions, setNumQuizQuestions] = useState<number[]>([1]);

    useEffect(() => {
        axios.get(`/api/course/${params.courseId}`)
            .then(response => {
                const courseData = response.data.result;
                setCourse(courseData);
                setSections(courseData.sections.map((section) => ({
                    title: section.title,
                    description: section.description,
                    chapters: section.chapters.map((chapter) => ({
                        title: chapter.title,
                        videoUrl: chapter.videoUrl,
                        description: chapter.description,
                    })),
                    quiz: section.quiz.length > 0 ? section.quiz : [{ question: '', options: [{ option: '' }], answer: '' }],
                })));
            })
            .catch(error => {
                console.error(error);
            });
    }, [params.courseId]);

    const handleUpdateCourse = async () => {
        try {
            const response = await axios.put(`/api/course/${params.courseId}`, {
                title: course?.title,
                description: course?.description,
                thumbnail: course?.thumbnail,
                overview: course?.overview,
                skills: course?.skills,
                sections: sections.map((section) => ({
                    title: section.title,
                    description: section.description,
                    chapters: section.chapters.map((chapter) => ({
                        title: chapter.title,
                        videoUrl: chapter.videoUrl,
                        description: chapter.description,
                    })),
                    quiz: section.quiz.map((quiz) => ({
                        question: quiz.question,
                        options: quiz.options.map((option) => ({ option: option.option })),
                        answer: quiz.answer,
                    })),
                })),
            });

            console.log('Server response:', response.data);
            if (response.data.success) {
                toast.success("Course updated successfully!");
            } else {
                toast.error(`Error updating course: ${response.data.result}`);
            }
        } catch (error) {
            console.error('Error during API call:', error);
            toast.error("Error updating course.");
        }
    };

    const handleAddSection = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const courseData = {
                title: course.title,
                description: course.description,
                thumbnail: course.thumbnail,
                overview: course.overview,
                skills: course.skills,
                sections: sections.map((section) => ({
                    title: section.title,
                    description: section.description,
                    chapters: section.chapters.map((chapter) => ({
                        title: chapter.title,
                        videoUrl: chapter.videoUrl,
                        description: chapter.description,
                    })),
                    quiz: section.quiz.map((quiz) => ({
                        question: quiz.question,
                        options: quiz.options.map((option) => ({ option: option.option })),
                        answer: quiz.answer,
                    })),
                })),
            };

            console.log("Course Data being sent to API:", JSON.stringify(courseData, null, 2));

            const response = await axios.put(`/api/course/${params.courseId}`, courseData);
            toast.success("Course updated successfully!");
        } catch (error ) {
            console.error(error);
            toast.error("Error updating course.");
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        if (course) {
 setCourse({ ...course, [name]: value });
        }
    };

    const handleNumSectionsChange = (event: ChangeEvent<HTMLInputElement>) => {
        const num = parseInt(event.target.value);
        setNumSections(num);
        setNumChapters(Array(num).fill(1));
        setNumQuizQuestions(Array(num).fill(1));
        setSections(Array(num).fill({
            title: '',
            description: '',
            chapters: [{ title: '', description: '', videoUrl: '' }],
            quiz: [{ question: '', options: [{ option: '' }], answer: '' }],
        }));
    };

    const handleNumChaptersChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const num = parseInt(event.target.value);
        const newNumChapters = [...numChapters];
        newNumChapters[index] = num;
        setNumChapters(newNumChapters);

        const newSections = [...sections];
        newSections[index].chapters = Array(num).fill({ title: '', description: '', videoUrl: '' });
        setSections(newSections);
    };

    const handleNumQuizQuestionsChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const num = parseInt(event.target.value);
        const newNumQuizQuestions = [...numQuizQuestions];
        newNumQuizQuestions[index] = num;
        setNumQuizQuestions(newNumQuizQuestions);

        const newSections = [...sections];
        newSections[index].quiz = Array(num).fill({ question: '', options: [{ option: '' }], answer: '' });
        setSections(newSections);
    };

    const handleSectionChange = (index: number, field: string, value: any) => {
        const newSections = [...sections];
        if (field === 'quiz') {
            newSections[index].quiz = value;
        } else {
            newSections[index] = { ...newSections[index], [field]: value };
        }
        setSections(newSections);
    };

    const handleChapterChange = (sectionIndex: number, chapterIndex: number, field: string, value: string) => {
        const newSections = [...sections];
        newSections[sectionIndex].chapters[chapterIndex] = { ...newSections[sectionIndex].chapters[chapterIndex], [field]: value };
        setSections(newSections);
    };

    const handleQuizChange = (sectionIndex: number, quizIndex: number, field: string, value: string) => {
        const newSections = [...sections];
        newSections[sectionIndex].quiz[quizIndex] = { ...newSections[sectionIndex].quiz[quizIndex], [field]: value };
        setSections(newSections);
    };

    const handleOptionChange = (sectionIndex: number, quizIndex: number, optionIndex: number, value: string) => {
        const newSections = [...sections];
        newSections[sectionIndex].quiz[quizIndex].options[optionIndex].option = value;
        setSections(newSections);
    };

    const handleAddOption = (sectionIndex: number, quizIndex: number) => {
        const newSections = [...sections];
        newSections[sectionIndex].quiz[quizIndex].options.push({ option: '' });
        setSections(newSections);
    };

    const handleRemoveOption = (sectionIndex: number, quizIndex: number, optionIndex: number) => {
        const newSections = [...sections];
        if (newSections[sectionIndex].quiz[quizIndex].options.length > 1) {
            newSections[sectionIndex].quiz[quizIndex].options.splice(optionIndex, 1);
            setSections(newSections);
        }
    };

    const handleVideoUpload = (sectionIndex: number, chapterIndex: number, url: string) => {
        const newSections = [...sections];
        newSections[sectionIndex].chapters[chapterIndex].videoUrl = url;
        setSections(newSections);
        console.log("Updated video URL:", url);
    };

    return (
        <TeacherHomePage>
            <div className='mx-auto justify-center items-center px-auto'>
                <div className='mt-20 ml-4 md:mx-10 flex flex-wrap mr-6'>
                    {course && (
                        <div>
                            <h1 className='text-indigo-600 text-3xl mb-8'>Create/Update Section for Course {course.title}</h1>
                            <div className='justify-center items-center md:mx-80'>
                                <h2 className='text-indigo-600 text-2xl mb-5'>Course Details:</h2>
                                <ul className='text-indigo-600'>
                                    <h2 className='text-xl mb-3'>Title:</ h2>
                                    <li>
                                        <input
                                            className=' mb-5 rounded-md text-black  focus:text-indigo-600 border border-slate-500 w-72 md:w-80 p-2 focus:border-indigo-600'
                                            type="text "
                                            name="title"
                                            value={course.title}
                                            onChange={handleInputChange}
                                        />
                                    </li>
                                    <h2 className='text-xl mb-3'>Description:</h2>
                                    <li>
                                        <textarea
                                            className='rounded-md focus:border-indigo-600 text-black focus:text-indigo-600 mb-5'
                                            rows={6}
                                            cols={40}
                                            name="description"
                                            value={course.description}
                                            onChange={handleInputChange}
                                        />
                                    </li>
                                    <h2 className='text-xl mb-3'>Overview:</h2>
                                    <li>
                                        <textarea
                                            className='rounded-md focus:border-indigo-600 text-black focus:text-indigo-600 mb-5'
                                            rows={6}
                                            cols={40}
                                            name="overview"
                                            value={course.overview}
                                            onChange={handleInputChange}
                                        />
                                        <h2 className='text-md text-slate-500 mb-5'>Write about the outcome of this course.</h2>
                                    </li>
                                    <h2 className='text-xl mb-3'>Skills:</h2>
                                    <li>
                                        <input
                                            className=' mb-5 rounded-md focus:border-indigo-600 text-black focus:text-indigo-600 w-72 md:w-80'
                                            type="text"
                                            name="skills"
                                            value={course.skills}
                                            onChange={handleInputChange}
                                        />
                                    </li>
                                    <h2 className='text-xl mb-3'>Thumbnail:</h2>
                                    <li>
                                        <UploadButton
                                            className='flex flex-wrap w-32 border rounded-md mt-4 ml-2 text-white bg-indigo-600 hover:bg-indigo-50 '
                                            endpoint="imageUploader"
                                            onClientUploadComplete={(res) => {
                                                console.log("Files: ", res);
                                                setCourse({ ...course, thumbnail: res[0].url });
                                                toast.success("Upload Completed");
                                            }}
                                            onUploadError={(error: Error) => {
                                                toast.error(`ERROR! ${error.message}`);
                                            }}
                                        />
                                    </li>
                                    <h2 className="mt-3 mb-3 text-slate-500">Upload the image having size not more than 4MB.</h2>
                                    {course.thumbnail && (
                                        <div className='mb-5'>
                                            <Image src={course.thumbnail} alt='thumbnail' width={300} height={150} className='rounded-md' />
                                        </div>
                                    )}
                                </ul>
                                <Button
                                    className='bg-indigo-600 hover:bg-indigo-500 text-lg py-2 px-4 mb-5'
                                    onClick={handleUpdateCourse}
                                >
                                    Update Course
                                </Button>
                                <h2 className='text-indigo-600 text-2xl mb-5 mt-5'>Create Section:</h2>
                                <form onSubmit={handleAddSection}>
                                    <h2 className='text-xl mb-3 text-indigo-600'>Number of Sections:</h2>
                                    <label>
                                        <input
                                            className='rounded-md mb-5 focus:border-indigo-600 focus:text-indigo-600'
                                            type="number"
                                            value={numSections}
                                            onChange={handleNumSectionsChange}
                                        />
                                    </label>
                                    {sections.map((section, sectionIndex) => (
                                        <div className='mb-5' key={sectionIndex}>
                                            <h2 className='text-xl mb-3 text-indigo-600'>Section {sectionIndex + 1} Title:</h2>
                                            <label>
                                                <input
                                                    className='rounded-md mb-5 focus:border-indigo-600 focus:text-indigo-600'
                                                    type="text"
                                                    value={section.title}
                                                    onChange={(event) => handleSectionChange(sectionIndex, 'title', event.target.value)}
                                                />
                                            </label>
                                            <h2 className='text-xl mb-3 text-indigo-600'>Section {sectionIndex + 1} Description:</h2>
                                            <label>
                                                <textarea
                                                    className='rounded-md mb-5 focus:border-indigo-600 focus:text-indigo-600'
                                                    rows={6}
                                                    cols={40}
                                                    value={section.description}
                                                    onChange={(event) => handleSectionChange(sectionIndex, 'description', event.target.value)}
                                                />
                                            </label>
                                            <h2 className='text-xl mb-3 text-indigo-600'>Number of Chapters:</h2>
                                            <label>
                                                <input
                                                    className='rounded-md mb-5 focus:border-indigo-600 focus:text-indigo-600'
                                                    type="number"
                                                    value={numChapters[sectionIndex]}
                                                    onChange={(event) => handleNumChaptersChange(event, sectionIndex)}
                                                />
                                            </label>
                                            {section.chapters.map((chapter, chapterIndex) => (
                                                <div className='mb-5' key={chapterIndex}>
                                                    <h2 className=' text-xl mb-3 text-indigo-600'>Chapter {chapterIndex + 1} Title:</h2>
                                                    <label>
                                                        <input
                                                            className='rounded-md mb-5 focus:border-indigo-600 focus:text-indigo-600'
                                                            type="text"
                                                            value={chapter.title}
                                                            onChange={(event) => handleChapterChange(sectionIndex, chapterIndex, 'title', event.target.value)}
                                                        />
                                                    </label>
                                                    <h2 className='text-xl mb-3 text-indigo-600'> Chapter {chapterIndex + 1} Description:</h2>
                                                    <label>
                                                        <textarea
                                                            className='rounded-md mb-5 focus:border-indigo-600 focus:text-indigo-600'
                                                            rows={6}
                                                            cols={40}
                                                            value={chapter.description}
                                                            onChange={(event) => handleChapterChange(sectionIndex, chapterIndex, 'description', event.target.value)}
                                                        />
                                                    </label>
                                                    <h2 className='text-xl mb-3 text-indigo-600'>Chapter {chapterIndex + 1} Video URL:</h2>
                                                    <UploadButton
                                                        className='flex flex-wrap w-32 border rounded-md mt-4 ml-2 text-white bg-indigo-600 hover:bg-indigo-50 '
                                                        endpoint="videoUploader"
                                                        onClientUploadComplete={(res) => {
                                                            handleVideoUpload(sectionIndex, chapterIndex, res[0].url);
                                                            toast.success("Upload Completed");
                                                        }}
                                                        onUploadError={(error: Error) => {
                                                            toast.error(`ERROR! ${error.message}`);
                                                        }}
                                                    />
                                                    {chapter.videoUrl && (
                                                        <div className='mt-4'>
                                                            <video width="320" height="240" className='rounded-md' controls>
                                                                <source src={chapter.videoUrl} type="video/mp4" className='rounded-md'/>
                                                                Your browser does not support the video tag.
                                                            </video>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                            <h2 className='text-xl mb-3 mt-5 text-indigo-600'>Number of Quiz Questions for {section.title}:</h2>
                                            <label>
                                                <input
                                                    className='rounded-md mb-5 focus:border-indigo-600 focus:text-indigo-600'
                                                    type="number"
                                                    value={numQuizQuestions[sectionIndex]}
                                                    onChange={(event) => handleNumQuizQuestionsChange(event, sectionIndex)}
                                                />
                                            </label>
                                            {section.quiz.map((quiz, quizIndex) => (
                                                <div key={quizIndex} className='mb-5'>
                                                    <h3 className='text-indigo-600 text-lg mb-2'>Question {quizIndex + 1}:</h3>
                                                    <textarea 
                                                        rows={4}
                                                        cols={36}
                                                        className='rounded-md mb-5 focus:border-indigo-600 focus:text-indigo-600'
                                                        type="text"
                                                        placeholder="Quiz Question"
                                                        value={quiz.question}
                                                        onChange={(event) => {
                                                            const newQuiz = [...section.quiz];
                                                            newQuiz[quizIndex].question = event.target.value;
                                                            handleSectionChange(sectionIndex, 'quiz', newQuiz);
                                                        }}
                                                    />
                                                    {quiz.options.map((option, optionIndex) => (
                                                        <div key={optionIndex} className='flex items-center mb-2'>
                                                            <input
                                                                className='rounded-md mb-5 focus:border-indigo-600 focus:text-indigo-600'
                                                                type="text"
                                                                placeholder={`Option ${optionIndex + 1}`}
                                                                value={option.option}
                                                                onChange={(event) => handleOptionChange(sectionIndex, quizIndex, optionIndex, event.target.value)}
                                                            />
                                                            <Button
                                                                className='bg-red-600 hover:bg-red-500 text-lg py-2 px-4 mb-5 mx-2'
                                                                onClick={() => handleRemoveOption(sectionIndex, quizIndex, optionIndex)}
                                                            >
                                                                Remove
                                                            </Button>
                                                        </div>
                                                    ))}
                                                    <Button
                                                        className='bg-indigo-600 hover:bg-indigo-500 text-lg py-2 px-4 mb-5 mx-2'
                                                        onClick={() => handleAddOption(sectionIndex, quizIndex)}
                                                    >
                                                        Add Option
                                                    </Button>
                                                    <h2 className='text-indigo-600 text-lg mb-2'>Correct option:</h2>
                                                    <input
                                                        className='rounded-md mb-5 focus:border-indigo-600 focus:text-indigo-600'
                                                        type="text"
                                                        placeholder="Correct Answer"
                                                        value={quiz.answer}
                                                        onChange={(event) => {
                                                            const newQuiz = [...section.quiz];
                                                            newQuiz[quizIndex].answer = event.target.value;
                                                            handleSectionChange(sectionIndex, 'quiz', newQuiz);
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                    <Button
                                        className='bg-indigo-600 hover:bg-indigo-500 text-lg py-2 px-4 mb-5 mx-10'
                                        type="submit"
                                    >
                                        Add Sections and Chapters
                                    </Button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </TeacherHomePage>
    );
}