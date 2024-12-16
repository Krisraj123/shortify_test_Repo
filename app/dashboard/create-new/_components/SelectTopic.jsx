"use client"
import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';


const SelectTopic = ({onUserSelect}) => {
  const options = ['Custom prompt','Random AI story','Bed TIme STory','Fun facts','Scary story','Motivational'];
  const [selectedOption,setSelectedOption] = useState();
  return (
    <div>
      <h2 className='font-bold text-2xl text-primary'
      >Content</h2>
      <p className='text-white'
      >Select the topic of the video</p>
      <Select onValueChange={(value) => {
        setSelectedOption(value)
        value!='Custom prompt'&&onUserSelect('topic',value);
        }}>
        <SelectTrigger className="w-full mt-2 p-6 text-lg">
            <SelectValue placeholder="Content Type" />
        </SelectTrigger>
        <SelectContent>
            {options.map((item,index) => (
                 <SelectItem key={index} value={item}>{item}</SelectItem>
            ))}
        </SelectContent>
      </Select>

      {selectedOption=='Custom prompt' &&
        <Textarea className="mt-3" placeholder="Enter the prompt"
        onChange={(e)=>onUserSelect('topic', e.target.value  )}/>
      }

    </div>
  )
}

export default SelectTopic
