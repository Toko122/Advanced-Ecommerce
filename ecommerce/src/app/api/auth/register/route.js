import connectDb from '@/lib/connectDb';
import User from '@/models/user';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs'

export async function POST(req) {
     try{
        await connectDb()
        const {email, username, phone, lastname, name, password} = await req.json()

        if(password.length < 6){
            return NextResponse.json({message: 'Password must be at least 6 characters'}, {status: 400})
        }

        const existedUser = await User.findOne({
            $or: [{email}, {username}, {phone}]
        })
        if(existedUser) return NextResponse.json({message: 'User already exists'}, {status: 409})

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            email, name, lastname, username, phone, password: hashedPassword
        })

        const safeUser = {
           id: user._id,
           email: user.email,
           username: user.username,
           name: user.name,
           lastname: user.lastname,
           phone: user.phone
        };        


        return NextResponse.json({message: 'User register successfully', user: safeUser}, {status: 200})
        
     }catch(err){
        return NextResponse.json({message: 'error register user', error: err.message}, {status: 500})
     }
}