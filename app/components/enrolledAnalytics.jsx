'use client'
import { useClerk, useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register necessary chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function EnrolledUsers() {
  const router = useRouter();
  const { user } = useUser();
  const clerk = useClerk();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let userId = clerk.user?.id;
        const userid = userId.toString();

        // Fetch all courses created by the logged-in user
        const response = await fetch('http://localhost:3000/api/course'); // Replace with your actual API route
        const data = await response.json();

        // Filter courses based on the logged-in user's created courses
        const userCourses = data.result.filter((course) => course.author[0].userId === userid);

        // For each course, count the number of enrolled students
        const updatedCourses = await Promise.all(userCourses.map(async (course) => {
          const courseId = course._id;

          // Fetch the students enrolled in this course
          const studentResponse = await fetch(`http://localhost:3000/api/student/count/${courseId}`); // Replace with actual student count API
          const studentData = await studentResponse.json();

          // Update the course with the enrolled student count
          return {
            ...course,
            enrolledCount: studentData.count || 0,
          };
        }));

        setCourses(updatedCourses);
      } catch (error) {
        toast.error('Error fetching courses:', error);
        setError('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchCourses();
    }
  }, [user]);

  // Prepare chart data for analytics
  const chartData = {
    labels: courses.map(course => course.title), // Course titles as X-axis labels
    datasets: [
      {
        label: 'Number of Enrolled Users',
        data: courses.map(course => course.enrolledCount), // Enrolled count for each course
        fill: false,
        borderColor: "#4338ca",
        tension: 0.1,
        pointBackgroundColor: "#4338ca", // Color for the data points
        pointBorderColor: "#fff", // Border color for points
        pointBorderWidth: 2,
        pointRadius: 6, // Increase the radius of the points
        pointHoverRadius: 8, // Increase the hover radius for better interaction
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Enrolled Users Analytics for Created Courses",
        color: '#4F46E5',  // Increase the font size of the chart title
        font: {
            size: 20,
            weight: 'bold', // Make the font bold
            family: 'Arial, sans-serif', // Set the font family
          },
      },
      legend: {
          labels: {
            color: '#4F46E5', // Change legend text color
          },
        },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, // Ensure the gap between points is set to 1 (integer)
          precision: 0,
          color: '#4F46E5',  // Increase font size of X-axis labels
          font: {
            size: 16,
            weight: 'bold', // Make the font bold
            family: 'Arial, sans-serif', // Set the font family
          }, // Make sure that no fractional values appear on the X-axis
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
            precision:0,
            color: '#4F46E5',  // Increase font size of X-axis labels
            font: {
                size: 16,
                weight: 'bold', // Make the font bold
                family: 'Arial, sans-serif', // Set the font family
              },
        }
      },
    },
  };

  if (loading) {
    return <div className="text-center p-4">Loading courses...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-wrap mx-auto p-4 bg-indigo-200 rounded-xl ">
      <h2 className="text-2xl font-bold m-4 text-indigo-600 text-center justify-center items-center">Enrolled Users</h2>
      <div className="flex flex-wrap mx-auto md:ml-10">
        <div className="md:w-full w-80 md:h-96 h-40">
          <Line data={chartData} options={chartOptions} className='bg-white p-1 md:p-5 h-96 w-96 md:w-full rounded-xl shadow-lg my-auto' />
        </div>
      </div>
    </div>
  );
}

export default EnrolledUsers;
