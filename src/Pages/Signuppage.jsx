import React, { useState } from 'react'
import Header from '../Components/Header/Header';
import Button from '../Components/Button/Button';
import Input from '../Components/Input/Input';
import Loginpage from './Loginpage';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../Slices/Userslice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';




function Signuppage() {
  const [fullname,setFullname]=useState("");
  const[email,setEmail]=useState("");
  const[passsword,setPassword]=useState("");
  const[cpasssword,setCpassword]=useState("");
  const[flag,Setflag]=useState(false)
  const[loading,Setloading]=useState(false)
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  const handleSignup=async ()=>{
    Setloading(true)
    if(passsword===cpasssword && passsword.length >=6&& fullname && email){
    try
    {
      const usercredential=await createUserWithEmailAndPassword(
        auth,email,passsword
      );
      const user=usercredential.user;
      console.log(user,"user")

      //saving the file on document
      await setDoc(doc(db,"users",user.uid),
      {
        name:fullname,
        email:user.email,
        uid:user.uid,
       
      })
      dispatch(
        setUser(
          {
            name:fullname,
            email:user.email,
            uid:user.uid,
          }
        )
      )
      toast.success("User has been Created")
      Setloading(false)
      setFullname("")
      setCpassword("")
      setPassword("")
      setEmail("")
      navigate("/profile")
      
    }catch(e)
    {
      toast.error(e.message)
      Setloading(false)
    }
  }else
  {
    if(passsword!=cpasssword)
    {
      toast.error("Passwords are not matching !")
    
      
    }else if(passsword.length<6)
    {
      toast.error("Password is too short")
    }
    Setloading(false)

  }
   
  }
 

  return (
    <div>
        <Header></Header>
        <div className='input-wrapper'>
          {!flag ? 
          <>
          <h1>Signup</h1>
        <Input state={fullname} setState={setFullname} placeholder="Full Name" type="text"></Input>
        <Input state={email} setState={setEmail} placeholder="Email" type="email"></Input>
        <Input state={passsword} setState={setPassword} placeholder="Password" type="password"></Input>
        <Input state={cpasssword} setState={setCpassword} placeholder="Confirm Password" type="password"></Input>
        <Button text={loading ? "loading...":"Signup"} onClick={handleSignup} disabled={loading}></Button>
        <p style={{color:"white"}}>Click here if you already have an Account. <span style={{color:"tomato",cursor:"pointer"} } onClick={()=>Setflag(!flag)}>Login</span></p>
        </>

        :
        <Loginpage Setflag={Setflag} flag={flag}>
       
        </Loginpage>
        }
       
        </div>
      
    </div>
  )
}

export default Signuppage