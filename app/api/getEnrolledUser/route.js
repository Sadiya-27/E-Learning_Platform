// Assuming you have a Student model that tracks enrollments
import { Student } from "@/utils/model/student";
import { Course } from "@/utils/model/course";

export async function GET(request) {
  try {
    // Fetch all courses
    const courses = await Course.find();

    // For each course, get the number of students enrolled
    const coursesWithEnrollments = await Promise.all(
      courses.map(async (course) => {
        const enrolledCount = await Student.countDocuments({
          "enrolledCourses.courseId": course._id,
        });

        // Add enrolledCount to each course
        return { ...course.toObject(), enrolledCount };
      })
    );

    return NextResponse.json({ result: coursesWithEnrollments, success: true });
  } catch (error) {
    console.error('Error fetching courses and enrollments:', error);
    return NextResponse.json({ result: error.message || 'Error fetching courses and enrollments', success: false }, { status: 500 });
  }
}
