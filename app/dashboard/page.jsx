"use client"
import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import EmptyState from './_components/EmptyState';
import { useState } from 'react';
import Link from 'next/link';
import { VideoDatas } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { db } from '@/configs/db';
import { eq } from 'drizzle-orm';
import VideoList from './_components/VideoList';


const Dashboard = () => {
  const [videoList,setVideoList] = useState([]);
  const {user} = useUser();


  useEffect(()=>{

    user&&GetVideoList()
  },[user,videoList.length])
  const GetVideoList = async()=>{
    const result = await db.select().from(VideoDatas)
    .where(eq(VideoDatas?.createdBy,user?.primaryEmailAddress?.emailAddress))
    console.log(result);
    setVideoList(result);
  }
  return (
    <div>
      <div className='flex justify-between items-center'>
          <h2 className='font-bold text-2xl text-primary'>Dashboard</h2>
          <Link href={'/dashboard/create-new'}>
          <Button>+ Create New</Button>
          </Link>
      </div>
      {/* Empty State */}

      {videoList?.length==0&&<div>
        <EmptyState/>
      </div>}

      <VideoList videoList={videoList}/>


    </div>

  )
}

export default Dashboard
