import CourseCard from '@/app/components/courseCard-dashboard';

const EnrolledCourses = () => {
  const enrolledCourses = [
    {
      id: 1,
      title: "Course 1",
      description: "This is course 1",
      enrolled: true
    },
    {
      id: 2,
      title: "Course 2",
      description: "This is course 2",
      enrolled: true
    },
    {
      id: 3,
      title: "Course 3",
      description: "This is course 3",
      enrolled: true
    }
  ];

  return (
    <div className="flex flex-wrap m-4 p-4 justify-center items-center">
      <h1 className="text-2xl font-bold text-indigo-800 m-2 text-left">Enrolled Courses</h1>
      <div className="flex flex-wrap justify-center items-center gap-6 mx-auto mt-3">
        {enrolledCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default EnrolledCourses;
