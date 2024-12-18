import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";
export async function POST(req){
    try{
    const {audioFileUrl} = await req.json();

    const client = new AssemblyAI({
        apiKey: process.env.NEXT_PUBLIC_ASSEMBLY_API_KEY,
      });
      
    
    
    // You can also transcribe a local file by passing in a file path
    // const FILE_URL = './path/to/file.mp3';
    
    // Request parameters 
    const data = {
    audio: audioFileUrl
    };
    
   
    const transcript = await client.transcripts.transcribe(data);
    console.log(transcript.words);
    return NextResponse.json({'transcript': transcript.words});
    }
    catch(error){
        return NextResponse.json({'error': error});
    }


    
}