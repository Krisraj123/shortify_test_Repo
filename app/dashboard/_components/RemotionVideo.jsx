
import React, { useEffect } from 'react'
import { AbsoluteFill, Img, Sequence, useVideoConfig ,Audio, useCurrentFrame} from 'remotion'

const RemotionVideo = ({script,imageList,audioFileUrl,caption,setDurationInFrame}) => {
  const {fps} = useVideoConfig();
  const frame = useCurrentFrame();
  console.log("audioFileurl",audioFileUrl)
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

  const formattedAudioUrl = String(audioFileUrl).trim();
  console.log("Formatted audio URL:", formattedAudioUrl);

  const getCurrentCaptions = ()=>{
    const currentTime = frame/30*1000;
    const currentCaption = caption.find((word)=>currentTime>=word.start && currentTime<=word.end)
    return currentCaption?currentCaption?.text:'';
  }
  return (
    <div>
      <AbsoluteFill className="bg-black">
          {imageList?.map((item,index)=>(
            
              
                <Sequence key={index} from={((index*getDurationFrame())/imageList?.length)} durationInFrames={getDurationFrame()}>
                    <AbsoluteFill style={{justifyContent:'center',alignItems:'center'}}>
                    <Img
                      src={item}
                      style={{
                        width:'100%',
                        height:'100%',
                        objectFit:'cover'
                      }}
                    
                    />

                    <AbsoluteFill style={{
                      color:'white',
                      justifyContent:'center',
                      top:undefined,
                      bottom:50,
                      height:150,
                      textAlign:'center',
                      width:'100%',
                    }}
                   >
                      <h2 className='text-2xl'>{getCurrentCaptions()}</h2>
                    </AbsoluteFill>
                    </AbsoluteFill>
                </Sequence>
              
          ))}
        <Audio src={formattedAudioUrl}/>
        </AbsoluteFill>
        
    </div>
  )
}

export default RemotionVideo
