import connectDb from "@/lib/connectDb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function GET(req, {params}) {
     try{
       await connectDb()
       const {id} = await params
       const product = await Product.findById(id)
       return NextResponse.json({product}, {status: 200})
     }catch(err){
        return NextResponse.json({message: "error getting product by id", error: err.message}, {status: 500})
     }
}