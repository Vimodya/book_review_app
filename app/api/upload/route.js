import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("CLOUDINARY_CLOUD_NAME", process.env.CLOUDINARY_CLOUD_NAME);

export async function POST(req) {
  try {
    const body = await req.json();
    const { image } = body;

    if (!image) {
      return new Response(JSON.stringify({ message: "No image provided" }), {
        status: 400,
      });
    }

    const result = await cloudinary.uploader.upload(image, {
      folder: "reviews",
    });

    return new Response(JSON.stringify({ url: result.secure_url }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return new Response(JSON.stringify({ message: "Image upload failed" }), {
      status: 500,
    });
  }
}
