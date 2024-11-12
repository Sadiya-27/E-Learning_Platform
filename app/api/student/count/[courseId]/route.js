import { Student } from '@/utils/model/student';

export async function GET(request, { params }) {
  const { courseId } = params;  // Get the courseId from the URL

  try {
    // Count how many students are enrolled in the course by matching courseId
    const count = await Student.countDocuments({
      "enrolledCourses.courseId": courseId,
    });

    return new Response(
      JSON.stringify({ count }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error counting enrolled students:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch student count' }),
      { status: 500 }
    );
  }
}
