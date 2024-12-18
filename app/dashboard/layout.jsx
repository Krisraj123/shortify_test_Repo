"use client"

import React, { useState } from 'react'
import Header from './_components/Header'
import SideNav from './_components/SideNav'
import { videoDataContext } from '../_context/videoDatacontext'
function Dashboardlayout({children}) {
  const [videoData,setVideoData] = useState([]);
  return (
    <videoDataContext.Provider value={{videoData,setVideoData}}>
    <div>
        <div className='hidden md:block h-screen bg-black fixed mt-[110px] w-64'>
            <SideNav/>
        </div>
        <div>
            <Header/>
            <div className='md:ml-64 p-10'>
            {children}
            </div>

        </div>
    </div>
    </videoDataContext.Provider>
  )
}

export default Dashboardlayout

