
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


const SelectDuration = ({onUserSelect}) => {
  return (

    <div className='mt-10'>
      <h2 className='font-bold text-2xl text-primary'
      >Content</h2>
      <p className='text-white'
      >Select the Duration of your video</p>
      <Select onValueChange={(value) => {

        value!='Custom prompt'&&onUserSelect('duration',value);
        }}>
        <SelectTrigger className="w-full mt-2 p-6 text-lg">
            <SelectValue placeholder="Select Duration" />
        </SelectTrigger>
        <SelectContent>
                 <SelectItem key='30' value='30 Seconds'>30 Seconds</SelectItem>
                 <SelectItem key='60' value='60 Seconds'>60 Seconds</SelectItem>
        </SelectContent>
      </Select>

    </div>
  )
}

export default SelectDuration

