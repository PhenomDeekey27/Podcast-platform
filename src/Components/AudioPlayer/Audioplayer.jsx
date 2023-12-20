import React, { useEffect, useRef, useState } from 'react'
import "./style.css";
import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { HiMiniSpeakerXMark } from "react-icons/hi2";


function Audioplayer({image,audioSrc}) {
    const auidoRef=useRef();
    const [duration,setduration]=useState(0);
    const[currentTime,setCurrentTime]=useState(0)
    const [volume,setvolume]=useState(1);
    const[Isplaying,setIsplaying]=useState(true);
    const[mute,Ismute]=useState(false)
    
    const handleDuration=(e)=>
    {
        setduration((e.target.value));
        auidoRef.current.currentTime=(e.target.value)
        console.log(e.target.value)
    }
    const togglePlay=()=>
    {
      setIsplaying(!Isplaying)
    }
    const toggleMute=()=>
    {
      Ismute(!mute)
    }
    const handleVolume=(e)=>
    {
      setvolume(e.target.value)
      auidoRef.current.value=e.target.value
    }

    const handleTimeupdate=()=>
    {
      setCurrentTime((auidoRef.current.currentTime))
     
    }

    const handleLoadedMetadata=()=>
    {
      setduration((auidoRef.current.duration))
    }

    const handleEnded=()=>
    {
      setCurrentTime(0);
      Isplaying(false)
    }


    useEffect(()=>
    {
      const audio=auidoRef.current;
      audio.addEventListener("timeupdate",handleTimeupdate)
      audio.addEventListener("loadedmetadata",handleLoadedMetadata)
      audio.addEventListener("ended",handleEnded)

      return ()=>
      {

        audio.removeEventListener("timeupdate",handleTimeupdate)
        audio.removeEventListener("loadedmetadata",handleLoadedMetadata)
        audio.removeEventListener("ended",handleEnded)

      }
    },[duration])



   

    useEffect(()=>
    {
      if(Isplaying)
      {
        auidoRef.current.play()
      }else
      {
        auidoRef.current.pause()
      }
    },[Isplaying])

    
    useEffect(()=>
    {
      if(mute)
      {
        auidoRef.current.volume=0;
        setvolume(0)
      }else
      {
        auidoRef.current.volume=1;
        setvolume(1)
       
      }
     

    },[mute])
    console.log(duration - currentTime)

    const formatTime=(time)=>
    {
      const minutes=Math.floor(time/60);
      const seconds=Math.floor(time%60);
      return `${minutes}:${(seconds < 10 ? "0":"")}${seconds}`
    }

   
  return (
    <div className='audio-player'>
        <img src={image} alt="" />
        <audio src={audioSrc} ref={auidoRef} ></audio>
        <p onClick={togglePlay} className='r-icons'>{Isplaying?<FaPause></FaPause>:<FaPlay></FaPlay>}</p>
        <div className="duration-flex">
            <p>{formatTime(currentTime)}</p>
            <input type="range" max={duration} value={currentTime} onChange={handleDuration} className='audio-range'  />
            <p>{formatTime(duration - currentTime)}</p>
            <p className='r-icons' onClick={toggleMute}>{mute==false ?<HiMiniSpeakerWave></HiMiniSpeakerWave>:<HiMiniSpeakerXMark></HiMiniSpeakerXMark>}</p>
            <input type="range" onChange={handleVolume} className='volume' value={volume} max={1} min={0} step={0.01} />
           
        </div>
    

       
    </div>
  )
}

export default Audioplayer