'use client'
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import {Button} from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const WeeklyCourses = () => {
    const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/course/weekly"); // API endpoint
        const data = await response.json();

        if (data.success) {
          setCourses(data.result);
        } else {
          setError(data.result || "Failed to fetch courses");
        }
      } catch (err) {
        setError("Error fetching weekly courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div className="md:mt-5 text-center">Loading...</div>;
  if (error) return <div className="md:mt-5 text-center">Error: {error}</div>;

  return (
    <div className="md:mt-14 mt-5">
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="w-full bg-white rounded-lg shadow-md overflow-hidden md:mx-3 my-2"
            >
              <Image
                src={course.thumbnail}
                alt={course.title}
                width={500}
                height={300}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 text-left">
                <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
                <p className="text-gray-600">{course.description}</p>
                <p className="mt-2">
                  <strong>Category:</strong> {course.category}
                </p>
                <p>
                  <strong>Duration:</strong> {course.duration}
                </p>
                <p>
                  <strong>Level:</strong> {course.level}
                </p>
                <p>
                  <strong>Uploaded on:</strong> {new Date(course.createdAt).toLocaleDateString()}
                </p>
                <div className="mt-4">
                  <Button onClick={() => router.push(`/course-detail-student/${course._id}`)} className="w-full bg-indigo-600 text-white hover:bg-indigo-500 py-2 text-lg rounded-lg">
                    Enroll
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No courses uploaded this week.</p>
      )}
    </div>
  );
};

export default WeeklyCourses;
