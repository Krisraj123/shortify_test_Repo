import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const EmptyState = () => {
  return (
    <div className='p-5 flex items-center flex-col mt-10 border-2 border-dashed py-24 gap-3'>
        <h2>You dont have any Short video created</h2>
        <Link href={'/dashboard/create-new'}>
        <Button>Create New Short Video</Button>
        </Link>
    </div>
  )
}

export default EmptyState
