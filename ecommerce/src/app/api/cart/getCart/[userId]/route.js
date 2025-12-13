import connectDb from "@/lib/connectDb";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";


export async function GET(req, {params}) {
      try{
        await connectDb()
        const {userId} = await params
        const cart = await Cart.findOne({userId})
        return NextResponse.json({message: 'cart get successfully', cart}, {status: 200})
      }catch(err){
        return NextResponse.json({message: 'error getting users cart', error: err.message}, {status: 500})
      }
}