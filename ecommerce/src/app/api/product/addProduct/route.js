import connectDb from "@/lib/connectDb";
import Product from "@/models/product";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
     try{
        await connectDb()

        const formData = await req.formData();

        const name = formData.get("name");
        const description = formData.get("description");
        const price = formData.get("price");
        const oldPrice = formData.get("oldPrice");
        const category = formData.get("category")
        const brand = formData.get("brand");
        const stock = formData.get("stock");
        const rating = formData.get("rating");

         const mainImageFile = formData.get("mainImage");
         let mainImageUrl = null;

         if (!mainImageFile || typeof mainImageFile.arrayBuffer !== "function") {
          return NextResponse.json(
            { message: "Main image is required" },
            { status: 400 }
          );
        }    

         const mainBuffer = Buffer.from(await mainImageFile.arrayBuffer())
         const uploadedMain = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({folder: '/uploads'}, (err, result) => {
                if(err) reject(err)
                else resolve(result)
            })
            stream.end(mainBuffer)
         })

         mainImageUrl = uploadedMain.secure_url

         const extraImages = formData.getAll('image')
         
          if (!extraImages || extraImages.length !== 4) {
            return NextResponse.json(
              { message: "Exactly 4 extra images are required" },
              { status: 400 }
            );
          }

         let extraImagesUrl = []

         for (const file of extraImages){
            const buffer = Buffer.from(await file.arrayBuffer())
            const uploaded = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({folder: '/uploads'}, (err, result) => {
                  if(err) reject(err)
                  else resolve(result)
                })
                stream.end(buffer)
            })
            extraImagesUrl.push(uploaded.secure_url)
         }

        const product = await Product.create({
           name,
           description,
           price,
           oldPrice,
           category,
           brand,
           stock,
           rating,
           images: {
             main: mainImageUrl,
             gallery: extraImagesUrl
           }         
        })

        return NextResponse.json({message: 'product created', product}, {status: 200})

     }catch(err){
        return NextResponse.json({message: "error posting product", error: err.message}, {status: 500})
     }
}