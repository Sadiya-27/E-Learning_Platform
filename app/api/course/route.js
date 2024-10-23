import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/utils/db";
import { Course } from '@/utils/model/course';

// Ensure Mongoose connection
async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(connectionStr);
  }
}

// GET method to fetch all courses
export async function GET() {
  await connectDB();
  try {
    const data = await Course.find();
    return NextResponse.json({ result: data, success: true });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ result: error.message || 'Error fetching courses', success: false }, { status: 500 });
  }
}

// POST method to create a new course
export async function POST(request) {
  await connectDB();
  const payload = await request.json();
  try {
    const course = new Course(payload);
    const result = await course.save();
    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json({ result: error.message || 'Error creating course', success: false }, { status: 500 });
  }
}

// PUT method to update a course
export async function PUT(request, { params }) {
  await connectDB();
  const courseId = params.id;
  const payload = await request.json();

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json({ result: "Course not found", success: false }, { status: 404 });
    }

    // Update course fields
    Object.assign(course, payload);

    // Update videoUrl within sections and chapters if provided
    if (payload.sections) {
      payload.sections.forEach((section, sectionIndex) => {
        if (course.sections[sectionIndex]) {
          section.chapters.forEach((chapter, chapterIndex) => {
            if (course.sections[sectionIndex].chapters[chapterIndex]) {
              course.sections[sectionIndex].chapters[chapterIndex].videoUrl = chapter.videoUrl;
            }
          });
        }
      });
    }

    // Save the updated course
    await course.save();
    return NextResponse.json({ result: course, success: true });
  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json({ result: error.message || "Failed to update course", success: false }, { status: 500 });
  }
}
