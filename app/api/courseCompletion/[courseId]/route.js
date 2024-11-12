// /api/courseCompletion/[courseId]/route.js

import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/utils/db";
import { Student } from "@/utils/model/student";

export async function GET(request, { params }) {
    try {
        const { courseId } = params; // Extract courseId from the route parameters

        if (!courseId) {
            return NextResponse.json ({ success: false, error: 'courseId is required' }, { status: 400 });
        }

        // Connect to the database
        await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });

        // Fetch students who are enrolled in the course
        const students = await Student.find({ 'enrolledCourses.courseId': courseId });
        
        // If no students are found, log and return empty
        if (!students.length) {
            console.log(`No students found for courseId: ${courseId}`);
            return NextResponse.json({ success: true, result: [] });
        }

        // Calculate the quizzes completed for each student
        const result = students.map(student => {
            const enrolledCourse = student.enrolledCourses.find(course => course.courseId.toString() === courseId);
            
            // Calculate the total number of quizzes completed
            const totalQuizzes = enrolledCourse.quiz.filter(quiz => quiz.quizScore !== null).length;

              

            return {
                studentId: student._id,
                studentName: student.name,
                totalQuizzesCompleted: totalQuizzes
            };
        });

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error('Error fetching student data:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch student data' }, { status: 500 });
    }
}