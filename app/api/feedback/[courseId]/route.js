import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/utils/db";
import { Feedback } from '@/utils/model/feedback';

// Ensure Mongoose connection
async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(connectionStr);
  }
}


export async function GET(request) {
    await connectDB();
    const courseId = request.nextUrl.searchParams.get("courseId");
  
    if (!courseId) {
      return NextResponse.json({ result: "Course ID is required", success: false }, { status: 400 });
    }
  
    try {
      const feedbackData = await Feedback.aggregate([
        { $match: { courseId } },
        { $unwind: "$review" },
        {
          $group: {
            _id: "$courseId",
            averageRating: { $avg: "$review.rating" },
          },
        },
      ]);
  
      if (feedbackData.length === 0) {
        return NextResponse.json({ result: "No feedback found for this course", success: true, averageRating: 0 });
      }
  
      return NextResponse.json({ result: feedbackData[0].averageRating, success: true });
    } catch (error) {
      console.error('Error fetching average rating:', error);
      return NextResponse.json({ result: error.message || 'Error fetching rating', success: false }, { status: 500 });
    }
  }