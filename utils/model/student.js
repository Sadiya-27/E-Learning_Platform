import mongoose from 'mongoose'

const studentModel = new  mongoose.Schema({
    userId: String,
    name: String,
    enrolledCourses: [{
        title: String,
        courseId: String,
        quiz: [{
            quizId: String,
            sectionName: String,
            quizScore: Number
        }]
    }]

});

export const Student = mongoose.models.students || mongoose.model("students",studentModel);

