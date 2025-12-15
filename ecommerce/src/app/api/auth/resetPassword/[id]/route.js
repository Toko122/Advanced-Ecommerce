import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import connectDb from "@/lib/connectDb";

export async function PUT(req, {params}) {
     try{
        await connectDb()
        const {id} = await params
        const {password} = await req.json()

        if(!password || password.length < 8){
         return NextResponse.json(
          { message: "Password must be at least 8 characters" },
          { status: 400 }
        );
        }

        const user = await User.findOne({
            resetToken: id,
            resetTokenExpire: {$gt: Date.now()}
        })

        if (!user) {
       return NextResponse.json(
          { message: "Invalid or expired token" },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10)
      user.password = hashedPassword
      user.resetToken = undefined
      user.resetTokenExpire = undefined 
      await user.save()

      return NextResponse.json({message: 'password changed'}, {status: 200})

     }catch(err){
        return NextResponse.json({message: 'error changing password', error: err.message}, {status: 500})
     }
}