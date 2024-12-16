import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import Image from 'next/image'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const CustomLoading = ({loading}) => {
  return (
        <AlertDialog open={loading}>

        <AlertDialogContent className='bg-black'>
                <AlertDialogTitle>
                    <VisuallyHidden>Loading</VisuallyHidden>
                </AlertDialogTitle>
            <div className='bg-black flex flex-col items-center my-10 justify-center' >
                <Image src={'/loading.gif'} alt='loading' width={100} height={100}
                />
                <h2>Loading...</h2>
            </div>
        </AlertDialogContent>
        </AlertDialog>

  )
}

export default CustomLoading

