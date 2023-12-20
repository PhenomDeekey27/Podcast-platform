import React, { useEffect } from 'react'
import Header from '../Components/Header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { QuerySnapshot, collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase';
import { setPodcasts } from '../Slices/PodcastSlice';
import PodcastCard from '../Components/Podcast-card/PodcastCard';
import { useState } from 'react';
import Input from '../Components/Input/Input';

function Podcast() {
    const dispatch=useDispatch();
    const podcasts=useSelector((state)=>state.podcasts.podcasts);
    const [search,Setsearch]=useState("")
 

    useEffect(()=>
    {
        const Unsubscribe=onSnapshot(
            query(collection(db,"podcasts")),
            (QuerySnapshot)=>
            {
                const podcastsData=[];
                QuerySnapshot.forEach((doc)=>
                {
                    podcastsData.push({id:doc.id,...doc.data()});
                });
                dispatch(setPodcasts(podcastsData));
            },
            (error)=>
            {
                console.error('error',error)
            }
        );

        return ()=>
        {
            Unsubscribe();
        }

    },[dispatch])
    var filteredPodcasts=podcasts.filter((item)=>item.title.trim().toLowerCase().includes(search.toLowerCase()))
    console.log(search)
  return (
    <div className='input-wrapper'>
        <Header></Header>
        <h1>Discover Podcasts</h1>
        <Input state={search} setState={Setsearch} placeholder={"Search by Title"} type="text"></Input>
        {filteredPodcasts.length>0 ? 
        <div className='podcasts-flex' style={{marginTop:"1rem"}}>
          {filteredPodcasts.map((item,ind)=>
          {
            return (<PodcastCard key={ind} title={item.title} id={item.id} displayImage={item.bannerImg} ></PodcastCard>)

          })}
        </div>
        : (<p>{search ? "Podcast Not Found" : "No Podcasts On the Platform"}</p>)
}
        
    </div>
  )
}

export default Podcast