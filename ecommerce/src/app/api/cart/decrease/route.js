import connectDb from "@/lib/connectDb";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";


export async function PUT(req, params) {
     try{
       await connectDb()
       const {userId, productId} = await req.json()
       const cart = await Cart.findOne({userId, 'products.productId': productId})

       const product = cart.products.find(p => p.productId.toString() === productId)

       if(product.quantity <= 1){
          cart.products = cart.products.filter(p => p.productId.toString() !== productId)
       }else{
          product.quantity = product.quantity - 1
       }

       await cart.save()

      return NextResponse.json({ message: "Quantity decreased", cart }, { status: 200 });
     }catch(err){
        return NextResponse.json({message: 'error increasing quantity', error: err.message}, {status: 500})
     }
}