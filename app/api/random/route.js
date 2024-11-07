import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/utils/db";
import { Course } from '@/utils/model/course';

// Ensure Mongoose connection
async function connectDB() {
  if (mongoose.connection.readyState === 0) {  // 0 means disconnected
    await mongoose.connect(connectionStr);
  }
}

export async function GET() {
  await connectDB();
  try {
    const data = await Course.aggregate([{ $sample: { size: 3 } }]); // Fetch 3 random courses
    return NextResponse.json({ result: data, success: true });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ result: error.message || 'Error fetching courses', success: false }, { status: 500 });
  }
}
