import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/utils/db";
import { Student } from "@/utils/model/student";

let isConnected;

const connectToDatabase = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Failed to connect to the database');
  }
};

export async function PUT(request, { params }) {
  const { studentId } = params;
  let payload;

  try {
    payload = await request.json();
    const { courseId, title } = payload;

    // Establish database connection
    await connectToDatabase();

    const student = await Student.findOne({ userId: studentId });
    if (!student) {
      return NextResponse.json({ success: false, error: 'Student not found' }, { status: 404 });
    }

    const isAlreadyEnrolled = student.enrolledCourses.some(course => course.courseId === courseId);
    if (isAlreadyEnrolled) {
      return NextResponse.json({ success: false, error: 'Student is already enrolled in this course' }, { status: 400 });
    }

    // Enroll the student in the course
    student.enrolledCourses.push({
      courseId,
      title,
      quiz: [] // Initially no quizzes for the course
    });

    await student.save();
    return NextResponse.json({ success: true, result: student });

  } catch (error) {
    console.error('Error enrolling student in course:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to enroll student in course' }, { status: 500 });
  }
}
