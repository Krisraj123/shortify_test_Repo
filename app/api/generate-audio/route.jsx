
import axios from 'axios';
import { NextResponse } from 'next/server';

const fs = require('fs');
const util = require('util');

    export async function POST(req){
        try{

            console.log('Incoming request to generate audio');


            const url = "https://api.ttsopenai.com/uapi/v1/text-to-speech";
            const headers = {
                "Content-Type": "application/json",
                "x-api-key": "tts-01fc5a2f6f407148aedeca78515bb359",
            };

            const {text,id} = await req.json();
            const data = {
                "model": "tts-1",
                "voice_id": id,
                "speed": 1,
                "input": text,
            };
            console.log(data);
            const response = await axios.post(url, data, { headers });

            //const writeFile = util.promisify(fs.writeFile);
           // await writeFile('output.mp3',response.data,'binary')
            //console.log('Audio content written to File:output.mp3')
           // return NextResponse.json({Result:'success'})

        }
        catch(error){
            console.error('Error:', error);
            return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
        }


    }
