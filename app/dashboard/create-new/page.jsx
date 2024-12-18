"use client"
import React, { useContext, useEffect, useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle';
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CustomLoading from './_components/CustomLoading';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/configs/supaBase';
import { videoDataContext } from '@/app/_context/videoDatacontext';
import { db } from '@/configs/db';
import { VideoData, VideoDatas } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import PlayerLayout from '../_components/PlayerLayout';

//const script = "Imagine a Roman marketplace, vibrant with life. But beneath the surface, a secret was brewing..This baker, not unlike others, was about to change history. He wasn't baking just bread; he was baking ergot..Ergot, a fungus that causes hallucinations and fits. Its accidental inclusion in his bread… sparked a city-wide, bizarre and disturbing episode.Senators struggled to understand the mass confusion and erratic behaviors. Was it divine punishment? A revolt? It took years to trace it back to a simple loaf of bread."
//const fileUrl = "https://ykapplpdlhldwgwsgrxf.supabase.co/storage/v1/object/public/shortify_public/6070ec11-6f27-4f15-aee7-d78c8ab4268f.mp3"

const CreateNew = () => {
  const [playVideo,setPlayVideo] = useState(true);
  const [videoId,setVideoId] = useState(9);
  const [formData,setFormData] = useState({});
  const [loading,setLoading] = useState(false);
  const [videoScript,setVideoScript] = useState()
  const [audioFileUrl,setAudioFileUrl] = useState();
  const [caption,setCaption] = useState();
  const [imageList,setImageList] = useState();
  const {user} = useUser();

  const {videoData,setVideoData} = useContext(videoDataContext);
  console.log(videoData);
  const onHandleInputChange = (fieldName,fieldValue) => {
    console.log(fieldName,fieldValue);
    setFormData(prev=>({
      ...prev,
      [fieldName]:fieldValue

    })
  )}

  const GetVideoScript=async()=>{

    setLoading(true);
    try{
    const prompt = 'Write a script to generate a '+formData.duration+' video on topic : '+formData.topic+' along with AI Image prompt in '+formData.imageStyle+' format for each scene and give me result in JSON format with ImagePrompt and contentText as field'
    const response = await axios.post('/api/get-video-script',{
     prompt:prompt
    })
    if (response.data.result){

      setVideoData(prev=>({
        ...prev,
        'videoScript':response.data.result.video_script
      }))
      setVideoScript(response.data.result.video_script);
      await GenerateAudioFile(response.data.result.video_script);
    }
  }
  catch(error){
    console.error('Error:',error);
    setLoading(false);
  }

    

  }

  const GenerateAudioFile = async(videoScriptData)=>{
    
    let script = '';
   
    const id = uuidv4();
    videoScriptData.forEach((item)=>{
      script = script+item.contentText+' ';
    })
  try{
    const response = await axios.post('/api/generate-audio',{
      text:script,
      id:id,
    })
    setVideoData(prev=>({
      ...prev,
      'audioFileUrl':response.data.result
    }))
      setAudioFileUrl(response.data.result);
      await AudioCaption(response.data.result,videoScriptData);
  }
    catch(error){
      console.error(error);
    }
  

  }

  const AudioCaption = async(fileUrl,videoScriptData)=>{
    try{
    const res = await axios.post('/api/generate-caption',
      {
        audioFileUrl:fileUrl,
      })
      setVideoData(prev=>({
        ...prev,
        'caption':res.data.transcript
      }))
      setCaption(res?.data?.transcript);
      await GenerateImage(videoScriptData)
    }
    catch(error){
      console.error('Error:',error);
      
      setLoading(false);
    }
    
  }

  const GenerateImage = async(videoScriptData)=>{
    
    let images=[];
    for (const element of videoScriptData)
    {
      try{
        const response = await axios.post('/api/generate-image',{
          prompt:element.imagePrompt,
        })
        console.log(response.data.result);
        console.log(user.primaryEmailAddress.emailAddress)
        images.push(response.data.result.publicUrl);
        console.log(images)
      }catch(e){
        console.log("error",e);
        setLoading(false);
      }
    }
    
    setImageList(images);
    console.log(images,videoScript,audioFileUrl,caption);
    setVideoData(prev=>({
      ...prev,
      'imageList':images
    }))
    
    setLoading(false);
  }

  useEffect(()=>{
    console.log(videoData);
    if(videoData&& Object.keys(videoData).length == 4){
      saveVideoData(videoData);
    }
  },[videoData])

    const saveVideoData = async (videoData) => {
      setLoading(true);
      try {
        const result = await db.insert(VideoDatas).values({
          // Use JSON.stringify to ensure valid JSON, and provide fallback empty arrays/objects
          script: videoData?.videoScript || { 'error': 'not inserted' },
          audioFileUrl: videoData?.audioFileUrl || 'empty',
          caption: videoData?.caption || { 'error': 'not inserted' },
          imageList: videoData?.imageList || [1, 2],
          createdBy: user?.primaryEmailAddress?.emailAddress || 'empty',
        }).returning({id: VideoData.id});
        setVideoId(result[0].id);
        setPlayVideo(true);
        console.log(result);
      } catch (error) {
        console.error('Error saving video data:', error);
        setLoading(false);
      }
      setLoading(false);
    };
    
  
  const onGenerateVideo=()=>{
    GetVideoScript();
    //GenerateAudioFile(script);
    //AudioCaption(fileUrl);
    //GenerateImage(videoSCRIPT);
  }
  return (
    <div className='md:px-20'>
        <h2 className='font-bold text-4xl text-primary text-center'>Create New</h2>
        <div className='mt-10 shadow-md p-10'>
          {/* Select Topics */}
          <SelectTopic onUserSelect={onHandleInputChange} />
          {/*Select styles */}
          <SelectStyle onUserSelect={onHandleInputChange}/>

          {/*Duration */}
          <SelectDuration onUserSelect={onHandleInputChange}/>

          <Button className='mt-10 w-full' onClick={onGenerateVideo}>Generate Video</Button>
        </div>
        <CustomLoading loading={loading}/>
        <PlayerLayout playVideo={playVideo} videoId={videoId}></PlayerLayout>
    </div>
  )
}

export default CreateNew
