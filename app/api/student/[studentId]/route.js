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

        const student = await Student.findOne({ userId: studentId });

        if (!student) {
            return NextResponse.json({ success: false, error: 'Student not found' }, { status: 404 });
        }

        return NextResponse.json({ result: student, success: true });
    } catch (error) {
        console.error('Error fetching student data:', error);
        return NextResponse.json({ success: false, error: error.message || 'Failed to fetch student data' }, { status: 500 });
    }
}



export async function PUT(request, { params }) {
    const { studentId } = params;
    let payload;

    try {
        payload = await request.json();
        const { courseId, quizId, sectionName, quizScore } = payload;

        await connectToDatabase();

        const updatedStudent = await Student.findOneAndUpdate(
            { userId: studentId, 'enrolledCourses.courseId': courseId }, 
            {
                $push: { 
                    'enrolledCourses.$.quiz': { quizId, sectionName, quizScore }
                }
            },
            { new: true }
        );

        if (!updatedStudent) {
            return NextResponse.json({ success: false, error: 'Student or course not found' }, { status: 404 });
        }

        return NextResponse.json({ result: updatedStudent, success: true });
    } catch (error) {
        console.error('Error updating student quiz results:', error);
        return NextResponse.json({ success: false, error: error.message || 'Failed to update quiz results' }, { status: 500 });
    }
}
