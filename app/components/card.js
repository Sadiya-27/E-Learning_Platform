/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Card = ({ course }) => {
  return (
    <div className="card bg-white shadow-xl ">
      <img src={course.image} alt={course.title} />
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <p>
        <Link href={`/courses/${course.id}`}>
          
            <Button className='bg-indigo-600 hover:bg-indigo-500'>Explore</Button>
          
        </Link>
      </p>
    </div>
  );
};

export default Card;