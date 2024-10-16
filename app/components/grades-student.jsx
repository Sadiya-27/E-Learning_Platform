import Link from 'next/link';

const Grades = ({ grades }) => {
    return (
        <div className="flex flex-wrap bg-white border border-gray-200 rounded-lg p-5 shadow-md">
        <table className="w-auto">
            <thead>
            <tr>
                <th className="text-center border-b-2 border-r-2">Course</th>
                <th className="text-center border-b-2">Grade</th>
            </tr>
            </thead>
            <tbody>
            {grades.map((grade) => (
                <tr key={grade.id}>
                <td className="py-2 px-4 md:px-20 border-r-2">{grade.course}</td>
                <td className="py-2 px-4 md:px-20">{grade.grade}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

const StudentGrades = () => {
    const grades = [
        {
        id: 1,
        course: "course 1",
        grade: "A-",
        },
        {
        id: 2,
        course: "course 2",
        grade: "B+",
        },
        {
        id: 3,
        course: "course 3",
        grade: "A",
        },
    ];

    return (
        <div className=" mx-auto p-4">
        <div className="flex flex-wrap justify-center gap-4 mt-4">
            <div className="flex flex-wrap ">
            <Grades grades={grades} />
            </div>
        </div>
        </div>
    );
};

export default StudentGrades;