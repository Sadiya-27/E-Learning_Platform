'use client';
import React, { useState } from 'react';
import TeacherHomePage from "../components/teacher-layout";
import { useClerk, useUser } from '@clerk/nextjs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Footer from '@/app/components/Footer-dashboard';
import toast from 'react-hot-toast';
import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from 'next/navigation'
import Image from 'next/image'


const CreateCourse = () => {
  const router= useRouter()

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [duration, setDuration] = useState('');
  const [level, setLevel] = useState('');
  const [thumbnail, setThumbnail] = useState<string>(''); // State for the thumbnail file


  const clerk = useClerk();
  const { user } = useUser();

  const name = `${user?.firstName} ${user?.lastName}`;
  const user_Id = clerk.user?.id;


  const addCourse = async () => {
    if (!thumbnail) {
      toast.error("Please upload a thumbnail");
      return;
    }


    // Prepare course data
    const courseData = {
      title,
      description,
      category,
      duration,
      level,
      thumbnail, // Get the uploaded thumbnail URL
      author: [{ name, userId: user_Id }],
    };

    // Send course data to your API
    const result = await fetch("http://localhost:3000/api/course", {
      method: 'POST',
      body: JSON.stringify(courseData),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await result.json();
    if (response.success) {
      toast.success("Course created successfully");
      router.push("/create-course");
      // Optional: redirect or clear the form here
    } else {
      toast.error("Failed to create course");
    }
  };

  if (!clerk.user) {
    // Handle the case where the user is not authenticated
    toast.error("Please login to create course");
    router.push('/sign-in');
  }

  

  return (
    <div>
      <TeacherHomePage>
        <div className="md:pl-10 mt-20 pl-10 text-indigo-600">
          <h1 className="md:text-3xl text-2xl text-indigo-600">Create Course</h1>
          <div className="md:ml-80 ml-4 md:mr-96 mr-10 mb-10">
            <h2 className="md:text-2xl text-xl md:mt-20 mt-16">Course Title:</h2>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Course Title" className="mt-5 border-slate-300 rounded-md w-72 md:w-full items-center justify-center focus:border-indigo-500" />
            <h2 className="mt-3 text-slate-500">Describe your course in 2 to 3 words. Don't worry you can change this later.</h2>
            <h2 className="text-slate-500">eg. Fullstack Web Development</h2>
            <h2 className="md:text-2xl text-xl md:mt-14 mt-10">Description:</h2>
            <textarea type="text" rows={5} cols={30} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Course Description" className="mt-5 border-slate-300 rounded-md w-72 h-40 md:w-full focus:border-indigo-500" />
            <h2 className="mt-3 text-slate-500">Describe the course outcome.</h2>
            <h2 className="text-slate-500">eg. By taking this course you will learn...</h2>
            <h2 className="md:text-2xl text-xl md:mt-14 mt-10">Category:</h2>
            <div className="mt-5">
              <Select value={category} onValueChange={(value) => setCategory(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Programming">Programming</SelectItem>
                  <SelectItem value="Web-development">Web Development</SelectItem>
                  <SelectItem value="Coding">Coding</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <h2 className="md:text-2xl text-xl md:mt-14 mt-10">Duration:</h2>
            <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Enter Course Duration" className="mt-5 border-slate-300 rounded-md w-72 md:w-full items-center justify-center focus:border-indigo-500" />
            <h2 className="mt-3 text-slate-500">Enter the duration of the course in hours.</h2>
            <h2 className="text-slate-500">eg. 10 hours</h2>
            <h2 className="md:text-2xl text-xl md:mt-14 mt-10">Level:</h2>
            <div className="mt-5">
              <Select value={level} onValueChange={(value) => setLevel(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <h2 className="md:text-2xl text-xl md:mt-14 mt-10">Thumbnail:</h2>
            <UploadButton
              className='flex flex-wrap w-32 border rounded-md mt-4 ml-2 text-white bg-indigo-600 hover:bg-indigo-500 '
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res);
                setThumbnail(res[0].url)
                toast.success("Upload Completed");
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                toast.error(`ERROR! ${error.message}`);
              }}
            />
            {thumbnail.length ? (
              <div className='mt-3'>
                <Image src={thumbnail} alt='thumbnail' width={300} height={150} className='rounded-md'/>
              </div>
            ) :null }
            <h2 className="mt-3 text-slate-500">Upload the image having size not more than 4MB.</h2>

            <div className='justify-center items-center mt-10 mx-24 md:mx-40'>
              <Button onClick={addCourse} className="text-lg  bg-indigo-600 hover:bg-indigo-500 text-white py-3 px-6 rounded mt-2 mx-auto">Create</Button>
            </div>
          </div>
        </div>
      </TeacherHomePage>
      <div className="pr-0 mr-0">
        <Footer />
      </div>
    </div>
  );
};

export default CreateCourse;
