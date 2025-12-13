import connectDb from "@/lib/connectDb";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";


export async function GET(req, { params }) {
     try{
        await connectDb()
        const {userId} = await params
        const cart = await Cart.findOne({userId}).populate('products.productId', 'name price images oldPrice')
        
        const totalQuantity = cart.products.reduce((acc, item) => acc + item.quantity, 0)

        return NextResponse.json({
          message: "Cart fetched successfully",
          totalQuantity,
          products: cart.products
        }, { status: 200 });
        
    }catch(err){
        return NextResponse.json({
      message: "Error fetching cart",
      error: err.message
    }, { status: 500 });
     }
}