import Link from 'next/link';
import {Button} from '@/components/ui/button'

const CourseCard = ({ course }) => {
  return (
    <div className="w-72 md:w-80 bg-white border border-gray-200 rounded-lg p-4 shadow-md mx-auto">
      <h3 className="text-lg font-bold">{course.title}</h3>
      <p className="text-gray-600">{course.description}</p>
      <p className="text-gray-600">Enrolled: {course.enrolled}</p>
      <Link href={`/courses/${course.id}`} className='no-underline text-white'>
        <Button className="bg-indigo-600 hover:bg-indigo-500 m-2">View Course</Button>
      </Link>
    </div>
  );
};

export default CourseCard;