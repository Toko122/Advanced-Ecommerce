import connectDb from '@/lib/connectDb'
import User from '@/models/user'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(req) {
     try{
        await connectDb()
        const {email, password} = await req.json()
        
        const user = await User.findOne({email})
        if(!user) return NextResponse.json({message: 'user not exist'}, {status: 401})

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return NextResponse.json({message: "invalid password"}, {status:400})

        const token = jwt.sign({id: user._id}, process.env.JWT, {expiresIn: '2d'})

         const safeUser = {
           id: user._id,
           email: user.email,
           username: user.username,
           name: user.name,
           lastname: user.lastname,
           phone: user.phone
        };        

        return NextResponse.json({message: 'user logined successfully', token, user: safeUser}, {status: 200})

     }catch(err){
        return NextResponse.json({message: "error login user"}, {status: 500})
     }
}