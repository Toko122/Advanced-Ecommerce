import { NextResponse } from "next/server";
import nodemailer from 'nodemailer'

export async function POST(req) {
     try{
        const { name, email, message } = await req.json()

        if(!name && !email && message){
           return NextResponse.json({message: 'all fields are required'}, {status: 401})
        }

        const transporter = nodemailer.createTransport({
         service: "gmail",
          auth: {
           user: process.env.EMAIL,
           pass: process.env.PASS,
          },
        })

        
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL,
      subject: `New message from ${name}`,
      text: message,
    });

     return NextResponse.json({ message: "Message sent successfully" });

     }catch(err){
        return NextResponse.json({message: 'error sending message', error: err.message}, {status: 500})
     }
}