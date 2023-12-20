import React, { useEffect, useState } from 'react'
import Header from '../Components/Header/Header'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../firebase';
import { toast } from 'react-toastify';
import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';
import Button from "../Components/Button/Button"
import Episode from '../Components/Episode/Episode';
import Audioplayer from '../Components/AudioPlayer/Audioplayer';


function PodcastDetailsPage() {
    const {id}=useParams();
    const [podcast,setPodcast]=useState({});
    const [episodes,Setepisodes]=useState([]);
    const navigate=useNavigate();
    const [playing,setplaying]=useState("")
  

    useEffect(()=>{
        if(id)
        {
           getData();

        }

    },[id])

    useEffect( ()=>{

        const unsubscribe=onSnapshot(
            query(collection(db,"podcasts",id,"episodes")),
            (quersnapshot)=>{
                const episodesData=[];
                quersnapshot.forEach((doc)=>
                {
                    episodesData.push({id:doc.id, ...doc.data() })
                    console.log(episodesData)
                    
                    
                  
                });
               
                Setepisodes(episodesData);
                
            },
            (error)=>
            {
                console.error("Error Fetching episodes",error)
            }
        )

        
        return ()=>{
            
            unsubscribe();
        }

    },[id])

    const getData= async()=>
    {
        try{
        const docRef=doc(db,"podcasts",id);
        const docSnap=await getDoc(docRef);
        if(docSnap.exists())
        {
            
            setPodcast({id:id,...docSnap.data()})
        }else
        {
            console.log("no doc")
            toast.error("No Podcast Found")
            navigate("/podcasts")
        }
        
    }catch(e)
    {
        toast.error(e.message)
    }
console.log(playing)
   

    }
  return (
    <>
        <Header></Header>
        <div className="input-wrapper" style={{marginTop:"0rem"}}>
            {podcast.id&&
            <>
            <div style={{
                display:"flex",
                alignItems:"center",
                justifyContent:"space-between",
                width:"100%"
            }}>
                  <h1 className='podcast-title'>{podcast.title}</h1>
               <Button text={"Create Episode"} width='250px' onClick={()=>navigate(`/podcast/${id}/create-episode`)}></Button>
                  

            </div>
          

            <div className="banner-wrapper">
            <img src={podcast.bannerImg} alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil dolorem error omnis excepturi dicta recusandae laboriosam corporis expedita, sunt aliquam! Voluptatibus eum quam blanditiis saepe, minus expedita debitis delectus facilis.</p>
            <h1 style={{textAlign:"left"}}>Episode</h1>
            {episodes.length >0 ? 
            <>{episodes.map((epi,ind)=>
                {
                    return <Episode title={epi.title} desc={epi.desc} audio={epi.audio} onClick={(file)=>setplaying(file)} key={ind} index={ind+1}></Episode>
                })}
            </> 
            : <p>No Episodes</p>}
            </div>
          
            </>}
        </div>
       {playing&&<Audioplayer audioSrc={playing} image={podcast.displayImg}></Audioplayer>} 
      
       
    </>
  )
}

export default PodcastDetailsPage