import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

const Header = () => {
  return (
    <div className='p-0 flex items-center justify-between shadow-md'>
      <div className='flex gap-3 items-center'>
        <Image src={'/logo.png'} alt="logo"width={100}
        height={100}/>

      </div>
      <div>
        <div className='flex gap-7 items-center px-6 '>
            <Button>Dashboard</Button>
            <UserButton/>
        </div>
      </div>
    </div>
  )
}

export default Header

