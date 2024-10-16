import { NextApiRequest, NextApiResponse } from 'next';
import Course from '../models/course.model';

const getCourses = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching courses' });
    }
};

export default getCourses;