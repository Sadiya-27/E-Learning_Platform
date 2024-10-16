import mongoose from 'mongoose'

const studentModel = new  mongoose.Schema({
    userId: String,
    name: String,
    enrolledCourses: [{
        title: String,
        courseId: String
    }]

});

export const Student = mongoose.models.students || mongoose.model("students",studentModel);

