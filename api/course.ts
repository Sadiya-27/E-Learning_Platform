import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = client.db();
const coursesCollection = db.collection('courses');

const createCourse = async (req: NextApiRequest, res: NextApiResponse) => {
  const courseData = req.body;

  try {
    const result = await coursesCollection.insertOne(courseData);
    res.status(201).json({ message: 'Course created successfully!' });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Error creating course' });
  }
};

export default createCourse;