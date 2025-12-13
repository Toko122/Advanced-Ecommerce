import connectDb from "@/lib/connectDb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function DELETE(req, {params}) {
     try{ 
        await connectDb()
        const { productId } = await params;
        const deletedProduct = await Product.findOneAndDelete({_id: productId})
        return NextResponse.json({message: "Product deleted", deletedProduct}, {status: 200})
     }catch(err){
        return NextResponse.json({message: 'error deleting product', error: err.message}, {status: 500})
     }
}