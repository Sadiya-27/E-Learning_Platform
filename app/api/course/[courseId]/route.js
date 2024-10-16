import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/utils/db";
import { Course } from '@/utils/model/course';

export async function GET(request, { params }) {
  await mongoose.connect(connectionStr);
  const courseId = params.courseId;

  try {
    // Find the course by courseId
    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json({ result: "Course not found", success: false }, { status: 404 });
    }

    // Return the course details
    return NextResponse.json({ result: course, success: true });
  } catch (error) {
    console.error('Error fetching course details:', error);
    return NextResponse.json({ result: "Error fetching course details", success: false }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await mongoose.connect(connectionStr);
  const courseId = params.courseId;

  try {
    // Find the course by courseId
    const course = await Course.findById(courseId);
    if (!course) {
      console.error(`Course not found for ID: ${courseId}`);
      return NextResponse.json({ result: "Course not found", success: false }, { status: 404 });
    }

    // Update the course details
    const courseData = await request.json();
    course.title = courseData.title;
    course.description = courseData.description;
    course.thumbnail = courseData.thumbnail;
    course.overview = courseData.overview;
    course.skills = courseData.skills;

    // Update the course sections
    course.sections = courseData.sections.map((section) => {
      const existingSection = course.sections.find((s) => s._id.toString() === section._id);
      if (existingSection) {
        existingSection.title = section.title;
        existingSection.description = section.description;
        existingSection.chapters = section.chapters.map((chapter) => {
          const existingChapter = existingSection.chapters.find((c) => c._id.toString() === chapter._id);
          if (existingChapter) {
            existingChapter.title = chapter.title;
            existingChapter.description = chapter.description;
            existingChapter.videoUrl = chapter.videoUrl;
            return existingChapter;
          } else {
            return chapter;
          }
        });
        return existingSection;
      } else {
        return section;
      }
    });

    // Save the updated course details
    await course.save();

    // Return the updated course details
    return NextResponse.json({ result: course, success: true });
  } catch (error) {
    console.error('Error updating course details:', error);
    return NextResponse.json({ result: "Error updating course details", success: false, error: error.message }, { status: 500 });
  }
}
