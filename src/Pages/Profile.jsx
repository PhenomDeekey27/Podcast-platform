import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../Components/Header/Header'
import Button from '../Components/Button/Button'
import {signOut } from "firebase/auth";
import { auth } from '../firebase';
import {toast} from 'react-toastify'
import Loader from '../Components/Loader/Loader';

function Profile() {
    const user=useSelector((state)=>state.user.user)
    console.log(user)
    if(!user)
    {
      return <Loader></Loader>
    }
    const HandleLogout=()=>
    {
      signOut(auth).then(()=>
      {
        toast.success("User Loggeed Out")
      }).catch((error)=>
      {
        toast.error(error.message)
      })
    }
  return (
    <div>
        <Header></Header>
        <div className='profile'>
        <h1>{user.name}</h1>
        <h2>{user.email}</h2>
        <Button text="Logout" onClick={HandleLogout}>Logout</Button>
        </div>
    </div>
  )
}

export default Profile