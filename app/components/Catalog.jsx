'use client'
import Head from 'next/head';
import Card from '../components/card';
import { useEffect, useState } from 'react';

const Catalog = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/catalog');
        const data = await response.json();
        if (data.success) {
          setCourses(data.result);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
      
      <div className="flex flex-wrap mx-auto py-2 md:px-4 md:py-4">
      
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 md:gap-6 gap-2">
        {courses.map((course) => (
          <Card key={course.id} course={course} />
        ))}
      </div>
    </div>
    
  );
}

export default Catalog;
