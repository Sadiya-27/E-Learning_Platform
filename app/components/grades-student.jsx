import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';

// Function to calculate grades based on percentage
const calculateGrade = (percentage) => {
  if (percentage >= 90) return 'A';
  if (percentage >= 80) return 'B+';
  if (percentage >= 70) return 'B';
  if (percentage >= 60) return 'C+';
  if (percentage >= 50) return 'C';
  return 'F';
};

const Grades = ({ grades }) => {
  if (!Array.isArray(grades)) {
    return <div>Invalid grades data</div>; // Fallback if grades are not an array
  }

  if (grades.length === 0) {
    return <div>No grades available</div>; // Handle empty grades array
  }

  return (
    <div className="flex flex-wrap bg-white border border-gray-200 rounded-lg p-3 shadow-md">
      <table className="w-auto">
        <thead>
          <tr>
            <th className="text-center border-b-2 border-r-2">Course</th>
            <th className="text-center border-b-2 border-r-2">Grade</th>
            <th className="text-center border-b-2">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade) => (
            <tr key={grade.id}>
              <td className="py-2 px-4 md:px-20 border-r-2">{grade.course}</td>
              <td className="py-2 px-4 md:px-20 border-r-2">{grade.grade}</td>
              <td className="py-2 px-4 md:px-20">{grade.percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const StudentGrades = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useUser();
  const studentId = user?.id; // Assuming you get studentId from the user object

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        // Fetch student data from the API
        const response = await fetch(`/api/student/grades/${studentId}`);
        const studentData = await response.json();

        if (studentData.success && Array.isArray(studentData.result.enrolledCourses)) {
          const enrolledCourses = studentData.result.enrolledCourses;

          const grades = await Promise.all(
            enrolledCourses.map(async (course) => {
              // Fetch course details, including quizzes, from the API
              const courseResponse = await fetch(`/api/course/${course.courseId}`);
              const courseData = await courseResponse.json();

              if (courseData.success && courseData.result) {
                const quizzes = courseData.result.sections.flatMap((section) => section.quiz);
                

                // Calculate total possible score (number of quiz questions)
                const totalPossibleScore = quizzes.length; // Assuming each quiz question is worth 1 point
                

                const totalScore = course.quiz.reduce((acc, quiz) => acc + (quiz.quizScore || 0), 0);
                console.log(totalScore);

                // Calculate percentage out of 100
                const percentage = (totalScore / totalPossibleScore) * 100;

                return {
                  id: course.courseId,
                  course: course.title,
                  grade: calculateGrade(percentage), // Calculate grade based on percentage
                  percentage: percentage.toFixed(2), // Show percentage with 2 decimal points
                };
              } else {
                return {
                  id: course.courseId,
                  course: course.title,
                  grade: 'N/A', // No grade if course data or quizzes are unavailable
                  percentage: 'N/A',
                };
              }
            })
          );

          setGrades(grades);
        } else {
          setError('Failed to fetch grades or no courses found');
        }
      } catch (err) {
        setError('Error fetching grades');
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchGrades();
    }
  }, [studentId]);

  if (loading) return <div>Loading grades...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="mx-auto p-4">
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <Grades grades={grades} />
      </div>
    </div>
  );
};

export default StudentGrades;
