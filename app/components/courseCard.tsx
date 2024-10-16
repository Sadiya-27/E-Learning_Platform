'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter, usePathname } from 'next/navigation';

interface CourseCardProps {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  rating: number;
  duration: string;
  level: string;
  author: {
    name: string;
  }[];
}

const CourseCard: React.FC<CourseCardProps> = ({
  _id,
  title,
  description,
  thumbnail,
  rating,
  duration,
  level,
  author,
}) => {
  const router = useRouter();
  const path = usePathname();

  const handleCourseDetail = () => {
    if (path === '/search-teacher') {
      router.push(`/course-detail/${_id}`);
    } else {
      router.push(`/course-detail-student/${_id}`);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md">
      <img src={thumbnail} alt={title} className="w-full h-48 object-cover rounded-md" />
      <div className="p-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-700 mb-2">{description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-5 h-5 text-yellow-500 ${
                  rating >= index + 1 ? 'fill-current' : 'fill-none'
                }`}
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
            <span className="text-gray-600 ml-0">{rating ? `${rating}/5` : 'No ratings yet'}</span>
          </div>
          <Button onClick={handleCourseDetail} className="bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded mt-2">
            Enroll Now
          </Button>
        </div>
        <div className="flex items-center my-2">
          <span className="text-gray-600 pt-2 mx-2">Duration: {duration}</span>
          <span className="text-gray-600 pt-2 mx-2">Level: {level}</span>
        </div>
        <span className="text-gray-600 pt-4 pl-2">Author: {author[0].name}</span>
      </div>
    </div>
  );
};

export default CourseCard;