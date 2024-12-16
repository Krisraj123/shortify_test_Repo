"use client"
import React, { useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle';
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CustomLoading from './_components/CustomLoading';
import { v4 as uuidv4 } from 'uuid';

const script = "Imagine a Roman marketplace, vibrant with life. But beneath the surface, a secret was brewing..This baker, not unlike others, was about to change history. He wasn't baking just bread; he was baking ergot..Ergot, a fungus that causes hallucinations and fits. Its accidental inclusion in his bread… sparked a city-wide, bizarre and disturbing episode.Senators struggled to understand the mass confusion and erratic behaviors. Was it divine punishment? A revolt? It took years to trace it back to a simple loaf of bread."

const CreateNew = () => {
  const [formData,setFormData] = useState({});
  const [loading,setLoading] = useState(false);
  const [videoScript,setVideoScript] = useState()
  const onHandleInputChange = (fieldName,fieldValue) => {
    console.log(fieldName,fieldValue);
    setFormData(prev=>({
      ...prev,
      [fieldName]:fieldValue

    })
  )}

  const GetVideoScript=async()=>{
    setLoading(true);
    const prompt = 'Write a script to generate a '+formData.duration+' video on topic : '+formData.topic+' along with AI Image prompt in '+formData.imageStyle+' format for each scene and give me result in JSON format with ImagePrompt and contentText as field'
    const result = await axios.post('/api/get-video-script',{
     prompt:prompt
    }).then(res=>{
      console.log(res.data.result.video_script)
      setVideoScript(res.data.result.video_script);
      //GenerateAudioFile(res.data.result.video_script);
    })

    setLoading(false);

  }

  const GenerateAudioFile = async(videoScriptData)=>{
    setLoading(true);
    //let script = '';
    const script = videoScriptData;
    const id = uuidv4();
    //videoScriptData.forEach((item)=>{
      //script = script+item.contentText+' ';
    //})
  try{
    const response = await axios.post('/api/generate-audio',{
      text:script,
      id:id,
    });

      console.log("response sent");
  }
    catch(error){
      console.error(error);
    }
    setLoading(false);

  }
  const onGenerateVideo=()=>{
    GetVideoScript();
    //GenerateAudioFile(script);
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
    </div>
  )
}

export default CreateNew
