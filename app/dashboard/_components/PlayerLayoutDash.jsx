"use client"
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import { Player } from "@remotion/player"
import RemotionVideo from './RemotionVideo'
import { Button } from '@/components/ui/button'
import { db } from '@/configs/db'
import { VideoData, VideoDatas } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import { useRouter } from 'next/navigation'
const PlayerLayoutDash = ({playVideo,videoId}) => {

  const [openVideo,setOpenVideo]=useState(false);
  const [videoData,setVideoData]=useState();
  const[durationInFrame,setDurationInFrame]=useState(100);
  const router = useRouter();

  useEffect(()=>{

    setOpenVideo(playVideo);
    getVideoData();
  },[playVideo,videoId])

  const getVideoData =async()=>{
    const result = await db.select().from(VideoDatas)
    .where(eq(VideoDatas.id,videoId));
    console.log(result);
    setVideoData(result[0])
  }

  return (

        <Dialog open={openVideo}>
            <DialogContent className="bg-red flex flex-col items-center justify-center">
                <DialogHeader className="w-full flex flex-col items-center space-y-6">
                <DialogTitle className="text-2xl font-bold my-5 mb-2">Your video is successfully generated...</DialogTitle>

                <div className='flex justify-center w-full select-none pointer-events-auto '>
                <Player
                    component={RemotionVideo}
                    durationInFrames={Number(durationInFrame.toFixed(0))}
                    compositionWidth={300}
                    compositionHeight={450}
                    fps={30}
                    controls={true}
                    inputProps={{
                      ...videoData,
                      setDurationInFrame:(frameValue)=>setDurationInFrame(frameValue)
                    }}
                />
                </div>
                <div className='flex gap-10 mt-9'>
                    <Button variant="secondary" onClick={()=>{setOpenVideo(false);}}>Back</Button>
                    <Button >Download</Button>
                </div>



                </DialogHeader>
            </DialogContent>
            </Dialog>


  )
}

export default PlayerLayoutDash
