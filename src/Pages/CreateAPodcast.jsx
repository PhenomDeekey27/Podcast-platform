import React, { useState } from 'react'
import Header from '../Components/Header/Header'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Input from '../Components/Input/Input';
import Button from '../Components/Button/Button';
import {toast} from "react-toastify"
import FileInput from '../Components/Input/FileInput';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {auth, db} from "../firebase"
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
function CreateAPodcast() {
    const[title,Settitle]=useState("");
    const[desc,Setdesc]=useState("");
    const[loading,Setloading]=useState(false)
    const[displayImg,SetdisplayImg]=useState();
    const[bannerImg,SetbannerImg]=useState();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const storage=getStorage()
  
    const handleSubmit=async()=>
    {
        if(title&&desc&&displayImg&&bannerImg)
        {
            Setloading(true)
            //1.uploading-files with downloadble links
            try{

                const bannerImageRef=ref(storage,
                    `podcasts/${auth.currentUser.uid}/${Date.now()}`
                    );
                await uploadBytes(bannerImageRef,bannerImg)
    
                const bannerImgUrl=await getDownloadURL(bannerImageRef)

                //code for display image

                 const displayImageRef=ref(storage,
                    `podcasts/${auth.currentUser.uid}/${Date.now()}`
                    );
                await uploadBytes(displayImageRef,displayImg)
    
                const displayImgUrl=await getDownloadURL(displayImageRef)
                
                console.log(displayImgUrl)
                
               
         const podcastData={
                    title:title,
                    description:desc,
                    createdBy:auth.currentUser.uid,
                    bannerImg:bannerImgUrl,
                    displayImg:displayImgUrl,
                }
            const docref= await addDoc(collection(db,"podcasts"),podcastData);
            Settitle("");
            Setdesc("");
            SetbannerImg(null);
            SetdisplayImg(null);
            toast.success("Podcast Created")
            Setloading(false)
           }catch(e)
            {
                toast.error(e.message)
                Setloading(false)
            }
         
        }else
        {
            toast.error("All fields are Required")
            Setloading(false)
        }
      

    }
    const bannerImgHandler=(file)=>
    {
        SetbannerImg(file)


    }
    const displayImgHandler=(file)=>
    {
        SetdisplayImg(file)

    }
    
  return (
    <div>
        <Header></Header>
        <div className="input-wrapper">
            <h1>Create a Podcast</h1>
            <Input state={title} setState={Settitle} placeholder="Title" type="text"></Input>
            <Input state={desc} setState={Setdesc} placeholder="Description" type="text"></Input>
            <FileInput accept={"image/*"} id="banner-image-input" filehandleDoc={bannerImgHandler} text="Upload Banner Image" ></FileInput>
            <FileInput accept={"image/*"} id="display-image-input" filehandleDoc={displayImgHandler} text="Upload Display Image" ></FileInput>
            <Button text={loading ? "loading...":"Create Podcast"} onClick={handleSubmit} disabled={loading}></Button>
        </div>
    </div>
  )
}

export default CreateAPodcast