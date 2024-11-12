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

// GET method to fetch the latest 4 courses
export async function GET() {
  await connectDB();
  try {
    const data = await Course.find().sort({ createdAt: -1 }).limit(4);
    return NextResponse.json({ result: data, success: true });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ result: error.message || 'Error fetching courses', success: false }, { status: 500 });
  }
}