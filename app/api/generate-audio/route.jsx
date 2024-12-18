import https from 'https';
import path from 'path';
import axios from 'axios';
import { NextResponse } from 'next/server';
import { supabase } from '@/configs/supaBase';
const fs = require('fs');
const util = require('util');

    export async function POST(req){
        try{
            const {text,id} = await req.json();

            const url = 'https://api.v7.unrealspeech.com/speech';
            const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: process.env.NEXT_PUBLIC_UNREAL_API_KEY
            },
            body: JSON.stringify({
                Text: text,
                VoiceId: 'Scarlett',
                Bitrate: '192k',
                Speed: '0',
                Pitch: '1',
                TimestampType: 'sentence'
            })
            };

            const response = await fetch(url, options)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = await response.json();
            const outputUri = responseData.OutputUri;
            const audioResponse = await fetch(outputUri);
            if (!audioResponse.ok) {
                throw new Error(`Failed to fetch audio file! Status: ${audioResponse.status}`);
            }
            const audioBuffer = await audioResponse.arrayBuffer();
            const audio = Buffer.from(new Uint8Array(audioBuffer)); 
            const filepath = ''+id+'.mp3';
            const {data,error} = await supabase.storage
                .from("shortify_public")
                .upload(filepath,audio)
            if(error){
                throw new Error;
            }
            const {data: publicUrlData} = await supabase.storage
             .from("shortify_public")
             .getPublicUrl(filepath)
            const publicUrl = publicUrlData.publicUrl;
            console.log(publicUrl)

        // Save the buffer to a file
            
            return NextResponse.json({result:publicUrl})

        }
        catch(error){
            console.error('Error:', error);
            return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
        }


    }
