import { NextResponse } from "next/server";
import mongoose from "mongoose"
import { connectionStr } from "@/utils/db"
import { Student } from "../../../utils/model/student";

export async function GET() {
    let data =[]
    try{
        await mongoose.connect(connectionStr)
    
        data = await Student.find();

    } catch(error) {
        data = {success: false,
            error: error.message("something went wrong")
        }
    }
    return NextResponse.json({result:data})
}


export async function POST(request){
    const payload = await request.json()

    await mongoose.connect(connectionStr)
    let student = new Student(payload);
    
    const result = await student.save();
    return NextResponse.json({result, success:true})
}