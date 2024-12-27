import Image from 'next/image'
import React from 'react'
import { useState } from 'react'

const SelectStyle = ({onUserSelect}) => {
    const styleOptions = [
        {
            name:'Realistic',
            image:'/aiimage.jpg'
        },
        {
            name:'Cartoon',
            image:'/cartoon.png'
        },
        {
            name:'Comic',
            image:'/batman.png'
        },
        {
            name:'Watercolor',
            image:'/watercolor.png'
        },
        {
            name:'PixelArt',
            image:'/pixelart.png'
        },

    ]
    const [selectedOption,setSelectedOption] = useState();
  return (
    <div className='mt-7'>
      <h2 className='font-bold text-2xl text-primary'
      >Style</h2>
      <p className='text-white'
      >Select the style of the video</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5
      xl:grid-cols-6 gap-4 mt-3'>
            {styleOptions.map((item,index) => (
                <div key={index} className={`relative hover:scale-105 transition-all cursor-pointer rounded-xl
                ${selectedOption==item.name&&'border-4 border-primary'}`}>
                    <Image src={item.image} width={190} height={160} alt={`${item.name} style`}
                    className='h-48  object-cover rounded-lg w-full'
                    onClick={() => {

                        setSelectedOption(item.name)
                        onUserSelect('imageStyle',item.name)

                        }}/>
                    <h2 className='absolute p-1 bg-black bottom-0 w-full text-center rounded-b-lg'>{item.name}</h2>
                </div>
            ))}
      </div>
    </div>
  )
}

export default SelectStyle
