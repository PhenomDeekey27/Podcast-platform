import React from 'react'
import { useState } from 'react';
import Button from '../Components/Button/Button';
import Input from '../Components/Input/Input';
import { auth } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../Slices/Userslice';
import { ToastContainer, toast } from 'react-toastify';

function Loginpage({Setflag,flag}) {

    const[email,setEmail]=useState("");
    const[passsword,setPassword]=useState("");
    const[loading,Setloading]=useState(false)
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleLogin= async ()=>
    {
        Setloading(true)
        if(email && passsword){

      try
      {
        const usercredential=await signInWithEmailAndPassword(
          auth,email,passsword
        );
        const user=usercredential.user;
        console.log(user,"user")
  
        //get the file that we have stored on firebase
        const userDoc= await getDoc(doc(db,"users",user.uid))
        const userData=userDoc.data();
        console.log(userData)

        dispatch(
          setUser(
            {
              name:userData.name,
              email: user.email,
              uid:user.uid,
            }
          )
        )
        Setloading(false)
        toast.success("Login Successful")
        navigate("/profile")
        setEmail("")
        setPassword("")
      }catch(e)
      {
        console.log(e)
        toast.error(e.message)
        Setloading(false)
        
      }
    }else
    {
      toast.error("Please Enter Email and Password")
      Setloading(false)
    }
    }
     

      
    
  return (
    <>
    
         <h1>Login</h1>
        <Input state={email} setState={setEmail} placeholder="Email" type="email"></Input>
        <Input state={passsword} setState={setPassword} placeholder="Password" type="password"></Input>
        <Button text={loading ? "Loading..." : "Login"} onClick={handleLogin} disabled={loading} ></Button>
        <p style={{color:"white"}}>Click here if you dont have an Account <span style={{color:"tomato",cursor:"pointer"}} onClick={()=>Setflag(!flag)}>Signup</span></p>

    </>
  )
}

export default Loginpage