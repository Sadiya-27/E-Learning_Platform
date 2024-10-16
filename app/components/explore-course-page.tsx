// ExploreCoursesPage.js
'use client'
import React, { useState, useEffect } from 'react';
import CourseCard from '@/app/components/courseCard';

const ExploreCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/course');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          setCourses(data.result);
        } else {
          setError(data.result); // Set error message
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return <div>Loading courses...</div>; // Loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Error state
  }

  return (
    <div className="flex flex-wrap m-auto md:m-4 sm:m-auto p-4 mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 sm:mx-auto">
        {courses.map((course) => (
          <CourseCard key={course._id} {...course} /> // Ensure you're using _id
        ))}
      </div>
    </div>
  );
};

export default ExploreCoursesPage;