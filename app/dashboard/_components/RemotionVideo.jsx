
import React, { useEffect } from 'react'
import { AbsoluteFill, Img, Sequence, useVideoConfig ,Audio, useCurrentFrame, interpolate} from 'remotion'

const RemotionVideo = ({script,imageList,audioFileUrl,caption,setDurationInFrame}) => {
  const {fps} = useVideoConfig();
  const frame = useCurrentFrame();
  console.log("audioFileurl",audioFileUrl)
  useEffect(() => {
    if (caption?.length) {
      const capLength = (caption[caption.length - 1]?.end / 1000) * fps +(1.3*fps);
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
    const currentTime = (frame/fps)*1000;
    const currentCaption = caption.find((word)=>currentTime>=word.start && currentTime<=word.end)
    return currentCaption?currentCaption?.text:'';
  }
  return (
    <div>
      <AbsoluteFill className="bg-black">
          {imageList?.map((item,index)=>{

            const startTime = (index*getDurationFrame())/imageList?.length;
            const duration = getDurationFrame();

            const scale =(index)=> interpolate(
              frame,
              [startTime,(startTime+duration)/2,startTime+duration],
              index%2==0 ?[1,1.8,1]:[1.8,1,1.8],
              {extrapolateLeft:'clamp',extrapolateRight:'clamp'}
            )
            return(
                <Sequence key={index} from={startTime} durationInFrames={(getDurationFrame()/imageList?.length)+(0.7*fps)}>
                    <AbsoluteFill style={{justifyContent:'center',alignItems:'center'}}>
                    <Img
                      src={item}
                      style={{
                        width:'100%',
                        height:'100%',
                        objectFit:'cover',
                        transform:`scale(${scale(index)})`
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

          )})}
        <Audio src={formattedAudioUrl}/>
        </AbsoluteFill>

    </div>
  )
}

export default RemotionVideo
