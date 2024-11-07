import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

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
  margin-top: 10px;
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
    const [courses, setCourses] = useState([]);
    const router = useRouter();
  
    useEffect(() => {
      const fetchCourses = async () => {
        try {
          const response = await fetch('/api/random');
          const data = await response.json();
  
          if (Array.isArray(data.result)) {
            setCourses(data.result);
          } else {
            console.error('Data returned is not an array:', data);
          }
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      };
  
      fetchCourses();
    }, []);
  
    if (!courses.length) {
      return <div>Loading courses...</div>;
    }
  
    return (
      <RecommendedCoursesContainer>
        {courses.map(course => {
          const rating = parseFloat(course.ratings);
          const validRating = !isNaN(rating) && rating >= 0 && rating <= 5 ? rating : 0; // Ensure valid rating value
  
          return (
            <RecommendedCourseCard key={course._id}>
              <RecommendedCourseImage src={course.thumbnail} />
              <RecommendedCourseTitle>{course.title}</RecommendedCourseTitle>
              <RecommendedCourseDescription>{course.description}</RecommendedCourseDescription>
              <RecommendedCourseRating>
                <RecommendedCourseRatingStars>
                  {Array(Math.floor(validRating)).fill(null).map((_, index) => (
                    <span key={index}>&#9733;</span>
                  ))}
                  {Array(5 - Math.floor(validRating)).fill(null).map((_, index) => (
                    <span key={index}>&#9734;</span>
                  ))}
                </RecommendedCourseRatingStars>
                <RecommendedCourseRatingText>
                  {validRating} / 5
                </RecommendedCourseRatingText>
              </RecommendedCourseRating>
              <Button onClick={() => router.push(`course-detail-student/${course._id}`)} className="bg-indigo-600 hover:bg-indigo-500 font-semibold">
                Enroll Now
              </Button>
            </RecommendedCourseCard>
          );
        })}
      </RecommendedCoursesContainer>
    );
  };
  

export default RecommendedCourses;
