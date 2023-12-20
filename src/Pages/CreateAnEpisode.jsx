import React from 'react'
import Header from '../Components/Header/Header'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../Components/Input/Input';
import FileInput from '../Components/Input/FileInput';
import Button from '../Components/Button/Button';
import { toast } from 'react-toastify';
import { getDownloadURL, getStorage, uploadBytes } from 'firebase/storage';

import { auth, db, storage } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import {ref} from "firebase/storage"

function CreateAnEpisode() {
    
    const [title,settitle]=useState("");
    const[desc,setdesc]=useState("");
    const[audio,setaudio]=useState("");
    const[loading,Setloading]=useState(false)
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {id}=useParams();
    const audioHandler=(file)=>
    {
       setaudio(file)
    }
    const handleSubmit= async()=>
    {
        Setloading(true)
        if(title&&desc&&audio)
        {
            try{
                //uploading the audio file

                const audioRef=ref(storage,`podcast-episodes/${auth.currentUser.uid}/${Date.now()}`);
                await uploadBytes(audioRef,audio)
               
                //getting the url for the audio file

                const audioURL=await getDownloadURL(audioRef);
                const episodeData=
                {
                    title:title,
                    desc:desc,
                    audio:audioURL
                }
                
                await addDoc(collection(db,"podcasts",id,"episodes"),episodeData);
                toast.success("Episode created Successfully")
                navigate(`/podcast/${id}`)
                settitle(""),
                setdesc(""),
                setaudio("")
                

            }catch(e)
            {
                toast.error(e.message)
                Setloading(false)

            }
        }else
        {
            toast.error("All fields Required")
            Setloading(false)
        }
    }
  return (
    <div>
        <Header></Header>
        <div className="input-wrapper">
            <h1>Create An Episode</h1>
            <Input state={title} setState={settitle} placeholder="Title" type="text"></Input>
            <Input state={desc} setState={setdesc} placeholder="Enter Description" type="email"></Input>
            <FileInput accept={"audio/*"} id="audio-image-input" filehandleDoc={audioHandler} text="Upload Audio File" ></FileInput>
            <Button text={loading ? "Loading..." : "Create Episode"} onClick={handleSubmit} disabled={loading} ></Button>

        </div>
    </div>
  )
}

export default CreateAnEpisode;