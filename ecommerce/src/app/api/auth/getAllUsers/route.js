import connectDb from "@/lib/connectDb";
import User from "@/models/user";
import { NextResponse } from "next/server";


export async function GET(req) {
     try{
        await connectDb()
        const users = await User.find()
        return NextResponse.json({message: 'users get successfully', users}, {status: 200})
     }catch(err){
        return NextResponse.json({message: 'error getting all users'}, {status: 500})
     }
}