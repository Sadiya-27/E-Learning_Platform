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

// POST method to create a new feedback entry
export async function POST(request) {
  await connectDB();
  const payload = await request.json();
  
  const { courseId, userId, feedback, rating } = payload;

  // Validate payload
  if (!courseId || !userId || !feedback || rating === undefined) {
    return NextResponse.json({ result: "All fields are required", success: false }, { status: 400 });
  }

  try {
    const newFeedback = new Feedback({ courseId, review: [{ userId, feedback, rating }] });
    const result = await newFeedback.save();
    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.error('Error creating feedback:', error);
    return NextResponse.json({ result: error.message || 'Error creating feedback', success: false }, { status: 500 });
  }
}

// PUT method to update feedback for a specific course
export async function PUT(request) {
  await connectDB();
  const payload = await request.json();
  const { courseId, userId, feedback, rating } = payload;

  // Validate payload
  if (!courseId || !userId || !feedback || rating === undefined) {
    return NextResponse.json({ result: "All fields are required", success: false }, { status: 400 });
  }

  try {
    // Find the course feedback by courseId
    const courseFeedback = await Feedback.findOne({ courseId });
    
    if (!courseFeedback) {
      // If no feedback exists for this course, create a new feedback entry
      const newFeedback = new Feedback({ courseId, review: [{ userId, feedback, rating }] });
      const result = await newFeedback.save();
      return NextResponse.json({ result, success: true });
    }

    // If feedback exists, check if the user has already submitted feedback
    const userFeedbackIndex = courseFeedback.review.findIndex(review => review.userId === userId);

    if (userFeedbackIndex >= 0) {
      // Update the existing feedback for the user
      courseFeedback.review[userFeedbackIndex] = { userId, feedback, rating };
    } else {
      // Add new feedback for the user
      courseFeedback.review.push({ userId, feedback, rating });
    }

    // Save the updated feedback
    const result = await courseFeedback.save();
    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.error('Error updating feedback:', error);
    return NextResponse.json({ result: error.message || 'Error updating feedback', success: false }, { status: 500 });
  }
}
