import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/utils/db";
import { Course } from '@/utils/model/course';

async function connectDB() {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(connectionStr);
    }
  }
  
// GET method to fetch weekly uploaded courses
export async function GET() {
    await connectDB();
    try {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
      const data = await Course.find({ createdAt: { $gte: oneWeekAgo } }).sort({ createdAt: -1 });
      return NextResponse.json({ result: data, success: true });
    } catch (error) {
      console.error('Error fetching weekly courses:', error);
      return NextResponse.json({ result: error.message || 'Error fetching weekly courses', success: false }, { status: 500 });
    }
  }
  