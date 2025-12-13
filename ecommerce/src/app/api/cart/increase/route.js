import connectDb from "@/lib/connectDb";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";


export async function PUT(req, params) {
     try{
       await connectDb()
       const {userId, productId} = await req.json()
       const cart = await Cart.findOneAndUpdate(
          {userId: userId, 'products.productId': productId},
          {$inc: {'products.$.quantity': 1} },
          {new: true}
       )

       return NextResponse.json({ message: "Quantity increased", cart }, { status: 200 })
     }catch(err){
        return NextResponse.json({message: 'error increasing quantity', error: err.message}, {status: 500})
     }
}