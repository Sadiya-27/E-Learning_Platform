import mongoose from 'mongoose'

const feedbackModel = new  mongoose.Schema({
    courseId: String,
    review : [{
        userId: String,
        feedback: String,
        rating: Number,
    }]
    
})

export const Feedback = mongoose.models.feedback || mongoose.model("feedback",feedbackModel);
