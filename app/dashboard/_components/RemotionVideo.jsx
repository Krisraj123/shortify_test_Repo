
import React, { useEffect } from 'react'
import { AbsoluteFill, Img, Sequence, useVideoConfig } from 'remotion'

const RemotionVideo = ({script,imageList,audioFileUrl,caption,setDurationInFrame}) => {
  const {fps} = useVideoConfig();

  useEffect(() => {
    if (caption?.length) {
      const capLength = (caption[caption.length - 1]?.end / 1000) * fps;
      setDurationInFrame(capLength);
    }
  }, [caption, fps, setDurationInFrame]);
  const getDurationFrame=()=>{
    return caption[caption?.length-1]?.end/1000*fps
  }
  console.log('imageList:',imageList)
  return (
    <div>
      <AbsoluteFill className="bg-black">
          {imageList?.map((item,index)=>(
            
              
                <Sequence key={index} from={((index*getDurationFrame())/imageList?.length)} durationInFrames={getDurationFrame()}>
                    <Img
                      src={item}
                      style={{
                        width:'100%',
                        height:'100%',
                        objectFit:'cover'
                      }}
                    
                    />
                </Sequence>
              
          ))}
        </AbsoluteFill>
    </div>
  )
}

export default RemotionVideo
