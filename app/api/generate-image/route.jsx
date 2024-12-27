import { supabase } from "@/configs/supaBase";
import { NextResponse } from "next/server";


export async function POST(req) {
    const {prompt} = await req.json();


    console.log(prompt);
    const data ={
        "inputs":prompt,
        "parameters": {
            "height": 1280,
            "width": 1024
        }

    }
	const response = await fetch(
		"https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
		{
			headers: {
				Authorization: process.env.NEXT_PUBLIC_HG_API_KEY,
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
    if (!response.ok) {
        const errorBody = await response.text();
        console.error('Error response body:', errorBody);
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
    }

    const buffer = await response.arrayBuffer();
    const imageBuffer = Buffer.from(buffer);

    // Define the file path
    const filepath = `ai-videos/${Date.now()}.png`;

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
        .from("shortify_public")
        .upload(filepath, imageBuffer, { contentType: "image/png" });

    if (uploadError) {
        console.error("Error uploading image:", uploadError.message);
        throw new Error("Error uploading image to Supabase Storage");
    }
    const {data: publicUrlImage} = await supabase.storage
        .from("shortify_public")
        .getPublicUrl(filepath)

    console.log(publicUrlImage)

	//const result = await response.blob();
    //const imageUrl =  URL.createObjectURL(result);
	//return NextResponse.json({"result":imageUrl})
    return NextResponse.json({"result":publicUrlImage})

}
