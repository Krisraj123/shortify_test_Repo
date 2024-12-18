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
const PlayerLayout = ({playVideo,videoId}) => {

  const [openVideo,setOpenVideo]=useState(false);
  const [videoData,setVideoData]=useState();
  const[durationInFrame,setDurationInFrame]=useState(100)
 
  useEffect(()=>{
    setOpenVideo(playVideo);
    getVideoData();
  },[playVideo])

  const getVideoData =async()=>{
    const result = await db.select().from(VideoDatas)
    .where(eq(VideoDatas.id,videoId));
    console.log(result);
    setVideoData(result[0])
  }
 
  return (
    
        <Dialog open={openVideo}>
            <DialogContent className="bg-red flex flex-col items-center">
                <DialogHeader>
                <DialogTitle className="text-2xl font-bold my-5">Your video is successfully generated...</DialogTitle>
              
                <div className='w-full max-w-xs'>
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
                <div className='flex'>
                    <Button variant="ghost">Save to Dashboard</Button>
                    <Button >Download</Button>
                </div>
                
            
                
                </DialogHeader>
            </DialogContent>
            </Dialog>
      
    
  )
}

export default PlayerLayout
