import Link from 'next/link';
import {useRouter} from 'next/navigation';
import { Button } from '@/components/ui/button';

const CourseCard = ({ course }) => {
  const router = useRouter();
  return (
    <div className="w-72 md:w-80 bg-white border m-5 border-gray-200 rounded-lg p-4 shadow-md mx-auto">
      <img src={course.thumbnail} alt={course.title} className="w-full h-44 object-cover rounded-lg" />
      <h3 className="text-lg font-bold mt-2">{course.title}</h3>
      <p className="text-gray-600 mt-2">{course.description}</p>
      <div className="w-full bg-gray-200 rounded-full h-5 mt-2">
        <div
          className="bg-indigo-600 h-5 rounded-full"
          style={{ width: `${course.progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-500 mt-1">{course.progress}% completed</p>
      
        <Button onClick={() => router.push(`/course-page-student/${course._id}`)} className="bg-indigo-600 hover:bg-indigo-500 m-2">View Course</Button>
      
    </div>
  );
};

export default CourseCard;
