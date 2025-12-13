import connectDb from "@/lib/connectDb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function GET(req) {
     try{
       await connectDb()
       const products = await Product.find().sort({createdAt: -1})
       return NextResponse.json({products}, {status: 200})
     }catch(err){
        return NextResponse.json({message: 'error getting product', error: err.message}, {status: 500})
     }
}