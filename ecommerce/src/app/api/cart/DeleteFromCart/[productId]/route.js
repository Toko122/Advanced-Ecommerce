import connectDb from "@/lib/connectDb";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";

export async function DELETE(req, {params}) {
    try{
        await connectDb()
        const {productId} = await params
        const {userId} = await req.json()
         const cart = await Cart.findOneAndUpdate(
            { userId },
            { $pull: { products: { productId } } },
            { new: true }
        );
       return NextResponse.json({message: 'product deleted successfully', cart}, {status: 200})
    }catch(err){
        return NextResponse.json({message: "error deleting from cart", error: err.message}, {status: 500})
    } 
}