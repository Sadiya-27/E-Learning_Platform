import mongoose from 'mongoose'

const courseModel = new  mongoose.Schema({
    title: String,
    description: String,
    category: String,
    duration: String,
    level: String,
    ratings: Number,
    author: [
        {
            name: String,
            userId: String
        }
    ],
    thumbnail:String,
    overview: String,
    skills: String,
    sections: [ {
        title: String,
        description: String,
        chapters: [{
            title: String,
            description: String,
            videoUrl: String,
        }],
        quiz: [{
            question: String,
            options: [{
                    option: String,
            }],
            answer: String,
        }],
    }],
}, { timestamps: true })

export const Course = mongoose.models.courses || mongoose.model("courses",courseModel);