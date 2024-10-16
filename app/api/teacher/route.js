import { NextResponse } from "next/server";
import mongoose from "mongoose"
import { connectionStr } from "@/utils/db"
import { Teacher } from "../../../utils/model/teacher";

export async function GET() {
    let data =[]
    try{
        await mongoose.connect(connectionStr)
    
        data = await Teacher.find();

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
    let teacher = new Teacher(payload);
    
    const result = await teacher.save();
    return NextResponse.json({result, success:true})
}