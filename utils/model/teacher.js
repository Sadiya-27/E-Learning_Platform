import mongoose from 'mongoose'

const teacherModel = new  mongoose.Schema({
    userId: String,
    name: String,
    createdCourses: [{
        title: String,
        courseId: String
    }]

});

export const Teacher = mongoose.models.teachers || mongoose.model("teachers",teacherModel);