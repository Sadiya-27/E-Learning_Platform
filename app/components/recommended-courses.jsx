import React from 'react';
import styled from 'styled-components';
import { Button } from '@/components/ui/button'

const RecommendedCoursesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 20px;
`;

const RecommendedCourseCard = styled.div`
    width: 300px;
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    background-color: #ffff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const RecommendedCourseImage = styled.img`
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 10px 10px 10px 10px;
`;

const RecommendedCourseTitle = styled.h2`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    margin-top:10px;
`;

const RecommendedCourseDescription = styled.p`
    font-size: 14px;
    margin-bottom: 20px;
`;

const RecommendedCourseRating = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const RecommendedCourseRatingStars = styled.span`
    font-size: 16px;
    margin-right: 10px;
    color: #eab308;
`;

const RecommendedCourseRatingText = styled.span`
    font-size: 14px;
`;

const RecommendedCourses = () => {
    const courses = [
        {
        id: 1,
        title: 'Course 1',
        description: 'This is a sample course description.',
        rating: 4.5,
        image: 'https://www.bismilsoft.com/admin/images/cover_image/Data-science-with-r-%20BismilSoft.jpg',
        },
        {
        id: 2,
        title: 'Course 2',
        description: 'This is another sample course description.',
        rating: 4.2,
        image: 'https://ciracollege.com/wp-content/uploads/2020/11/How-to-Learn-Python.jpg',
        },
        {
        id: 3,
        title: 'Course 3',
        description: 'This is yet another sample course description.',
        rating: 4.8,
        image: 'https://www.traininginbangalore.com/images/infographics/advanced-java-training-in-bangalore-tib.jpg',
        },
    ];

    return (
        <RecommendedCoursesContainer>
        {courses.map(course => (
            <RecommendedCourseCard key={course.id}>
            <RecommendedCourseImage src={course.image} />
            <RecommendedCourseTitle>{course.title}</RecommendedCourseTitle>
            <RecommendedCourseDescription>{course.description}</RecommendedCourseDescription>
            <RecommendedCourseRating>
                <RecommendedCourseRatingStars>
                {Array(Math.floor(course.rating)).fill(null).map((_, index) => (
                    <span key={index}>&#9733;</span>
                ))}
                {Array(5 - Math.floor(course.rating)).fill(null).map((_, index) => (
                    <span key={index}>&#9734;</span>
                ))}
                </RecommendedCourseRatingStars>
                <RecommendedCourseRatingText>
                {course.rating} / 5
                </RecommendedCourseRatingText>
            </RecommendedCourseRating>
            <Button className='bg-indigo-600 hover:bg-indigo-500 font-semibold'>Enroll Now</Button>
            </RecommendedCourseCard>
        ))}
        </RecommendedCoursesContainer>
    );
};

export default RecommendedCourses;