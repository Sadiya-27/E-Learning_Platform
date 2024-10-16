// /api/course/route.js

import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/utils/db"; // Your connection string
import { Course } from '@/utils/model/course'; // Import your Course model
import { usePathname } from 'next/navigation'

// GET method to fetch a course or all courses
export async function GET(request, { params }) {
    let data = []
    let success= true
    try {
        await mongoose.connect(connectionStr);
        data = await Course.find();

    } catch (error) {
        data={result:error}
        success: false
    }
    return NextResponse.json({result:data, success})
}

// PUT method to update a course
export async function PUT(request, { params }) {
  await connectToDatabase(); // Ensure database is connected
  const { id } = params;
  const payload = await request.json();

  try {
    const course = await Course.findByIdAndUpdate(id, payload, { new: true });
    if (!course) {
      return NextResponse.json({ result: "Course not found", success: false }, { status: 404 });
    }

    return NextResponse.json({ result: course, success: true });
  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json({ result: "Failed to update course", success: false }, { status: 500 });
  }
}

let router = usePathname();
router.put('/:id', async (req, res) => {
    await connectDB(); // Reuse the connection
  
    try {
      const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      // Update the videoUrl field within the chapters array
      course.sections.forEach((section) => {
        section.chapters.forEach((chapter) => {
          if (req.body.sections && req.body.sections[0].chapters) {
            const updatedChapter = req.body.sections[0].chapters.find((c) => c.title === chapter.title);
            if (updatedChapter) {
              chapter.videoUrl = updatedChapter.videoUrl;
            }
          }
        });
      });
  
      await course.save(); // Save the updated course document
  
      res.json({ course, success: true });
    } catch (error) {
      console.error('Error updating course:', error);
      res.status(500).json({ message: 'Error updating course' });
    }
  });