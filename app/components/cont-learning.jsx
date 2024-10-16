import React from 'react';
import styled from 'styled-components';
import { Button } from '@/components/ui/button'

const ContinueLearningContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 20px;
    padding-left: 20px;
    padding-right: 20px;

`;

const CourseCard = styled.div`
    width: 300px;
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    background-color: #ffff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const CourseImage = styled.img`
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 10px 10px 10px 10px;
`;

const CourseTitle = styled.h2`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
`;

const CourseDescription = styled.p`
    font-size: 14px;
    margin-bottom: 20px;
`;

const ProgressBarContainer = styled.div`
    width: 100%;
    height: 20px;
    background-color: #ccc;
    border-radius: 10px;
    overflow: hidden;
`;

const ProgressBar = styled.div`
    width: ${({ progress }) => `${progress}%`};
    height: 100%;
    background-color: #4338ca;
    border-radius: 10px;
    transition: width 0.5s ease;
`;

const CourseContent = styled.div`
    margin-top: 20px;
`;

const CourseContentTitle = styled.h3`
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
`;

const CourseContentList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const ContinueLearning = () => {
    const courses = [
        {
        id: 1,
        title: 'Course 1',
        description: 'This is a sample course description.',
        image: 'https://taffuploadsprod.s3.amazonaws.com/blog/wp-content/uploads/2023/08/08122246/Power-of-Python-for-AI-and-Machine-Learning.png',
        progress: 50,
        content: [
            {
            title: 'Module 1',
            
            },
        ],
        },
        {
        id: 2,
        title: 'Course 2',
        description: 'This is another sample course description.',
        image: 'https://coursekit.dev/blog/online-course-react.png',
        progress: 25,
        content: [
            {
            title: 'Module 1',
            
            },
        ],
        },
        {
        id: 3,
        title: 'Course 3',
        description: 'This is yet another sample course description.',
        image: 'https://media.licdn.com/dms/image/D5612AQE0r5WC8r0HQg/article-cover_image-shrink_720_1280/0/1657711469335?e=2147483647&v=beta&t=y46kqfqImgi-IbshBGRs3lMz1HCTBvL8RjFAILShitg',
        progress: 75,
        content: [
            {
            title: 'Module 1',
            
            },
        ],
        },
    ];

    return (
        <ContinueLearningContainer>
        {courses.map(course => (
            <CourseCard key={course.id} className='rounded-lg'>
            <CourseImage src={course.image} className='p-0 mb-2 border rounded-xl'/>
            <CourseTitle className='mt-2'>{course.title}</CourseTitle>
            <CourseDescription>{course.description}</CourseDescription>
            <ProgressBarContainer>
                <ProgressBar progress={course.progress} />
            </ProgressBarContainer>
            <CourseContent>
                {course.content.map((module, index) => (
                <div key={index}>
                    <CourseContentTitle>{module.title}</CourseContentTitle>
                    <CourseContentList>
                    </CourseContentList>
                </div>
                ))}
            </CourseContent>
            <Button className='bg-indigo-600 hover:bg-indigo-500 m-3'>Go to Course</Button>
            </CourseCard>
        ))}
        </ContinueLearningContainer>
    );
};

export default ContinueLearning;