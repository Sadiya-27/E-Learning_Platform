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

export async function GET(request, { params }) {
    const { studentId } = params;
  
    try {
      await connectToDatabase();
  
      // Fetch student data by userId
      const student = await Student.findOne({ userId: studentId }).lean();
  
      if (!student) {
        return NextResponse.json({ success: false, error: 'Student not found' }, { status: 404 });
      }
  
      
  
      return NextResponse.json({ result: student, success: true });
    } catch (error) {
      console.error('Error fetching student data:', error);
      return NextResponse.json({ success: false, error: error.message || 'Failed to fetch student data' }, { status: 500 });
    }
  }
  