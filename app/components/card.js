/* eslint-disable @next/next/no-img-element */
'use client'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import {useRouter} from 'next/navigation'

const Card = ({ course }) => {
  const router = useRouter();

  const handleExploreClick = (e) => {
    e.preventDefault();
    toast("You need to sign up to enroll in the course.");
    router.push('/sign-up')
  };

  return (
    <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover"/>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
        <p className="text-gray-600 mb-4">{course.description}</p>
        
          <Button className="bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded-md" onClick={handleExploreClick}>Explore</Button>
        
      </div>
    </div>
  );
};

export default Card;
