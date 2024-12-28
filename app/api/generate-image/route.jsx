import { supabase } from "@/configs/supaBase";
import { NextResponse } from "next/server";
import { ImageGenerationTasks } from "@/configs/schema";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";

export async function POST(req) {
    const {prompt} = await req.json();
    const taskId = Date.now().toString();

    await db.insert(ImageGenerationTasks).values({
        taskId:taskId,
        status:"processing",
        prompt:prompt
    })
    processImageGeneration(taskId, prompt);

    return NextResponse.json({
        taskId,
        status:'processing'
    })
}

export async function GET(req){
    const url = new URL(req.url);
    const taskId = url.searchParams.get('taskId');

    const result = await db.select().from(ImageGenerationTasks)
    .where(eq(ImageGenerationTasks.taskId,taskId))
    .limit(1)

    if (!result.length) {
        return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    return NextResponse.json(result[0]);
}


async function processImageGeneration(taskId , prompt){
    try{
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
        /*if (!response.ok) {
            const errorBody = await response.text();
            console.error('Error response body:', errorBody);
            throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
        }*/

        const buffer = await response.arrayBuffer();
        const imageBuffer = Buffer.from(buffer);

        // Define the file path
        const filepath = `ai-videos/${Date.now()}.png`;

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from("shortify_public")
            .upload(filepath, imageBuffer, { contentType: "image/png" });

        /*if (uploadError) {
            console.error("Error uploading image:", uploadError.message);
            throw new Error("Error uploading image to Supabase Storage");
        }*/
        const {data: publicUrlImage} = await supabase.storage
            .from("shortify_public")
            .getPublicUrl(filepath)

        console.log(publicUrlImage)

        await db.update(ImageGenerationTasks)
        .set({
            status: "completed",
            result:publicUrlImage,
            updatedAt: new Date()
        }).where(eq(ImageGenerationTasks.taskId, taskId));
    }
    catch(error){

        await db.update(ImageGenerationTasks)
            .set({
                status: 'error',
                error: error.message,
                updatedAt: new Date()
            })
            .where(eq(ImageGenerationTasks.taskId, taskId));

    }
	//const result = await response.blob();
    //const imageUrl =  URL.createObjectURL(result);
	//return NextResponse.json({"result":imageUrl})
       // return NextResponse.json({"result":publicUrlImage})

}
