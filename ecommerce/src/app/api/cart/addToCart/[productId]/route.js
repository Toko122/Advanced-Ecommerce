import connectDb from "@/lib/connectDb";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";


export async function POST(req) {
      try{
        await connectDb()
        const {quantity, productId, userId} = await req.json()

        let cart = await Cart.findOne({userId})

        if(!cart){
            cart = await Cart.create({
                userId,
                products: [{productId, quantity}]
            }) 
        }else{
            const productIndex = cart.products.findIndex(
                (p) => p.productId.toString() === productId
            )

            if(productIndex >= 0){
                cart.products[productIndex].quantity += quantity
            }else{
                cart.products.push({quantity, productId})
            }
            await cart.save()
        }
        return NextResponse.json({ message: "Product added to cart", cart }, { status: 200 });
      }catch(err){
        return NextResponse.json({message: 'error adding product to cart', error: err.message}, {status:500})
      }
}
