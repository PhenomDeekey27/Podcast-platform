import { useEffect, useState } from 'react'

import './App.css'

import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Signuppage from './Pages/Signuppage';
import Profile from './Pages/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from './Slices/Userslice';
import PrivateRoutes from './Components/PrivateRoutes';
import CreateAPodcast from './Pages/CreateAPodcast';
import Podcast from './Pages/Podcast';
import PodcastDetailsPage from './Pages/PodcastDetailsPage';
import CreateAnEpisode from './Pages/CreateAnEpisode';




function App() {
  const dispatch=useDispatch();

  useEffect(()=>
  {
    const Unsubscribe=onAuthStateChanged(auth,(user)=>
    {

      if(user)
      {
        const UnsubscribeSnapShot=onSnapshot(
          doc(db,"users",user.uid),(userDoc)=>
          {
            if(userDoc.exists())
            {
              const userData=userDoc.data();
              dispatch(setUser(
                {
                  name:userData.name,
                  email:userData.email,
                  uid:user.uid,
                  profilePic:userData.profilePic,

                }
              ))
              
            }
          },(error)=>{
            console.error(error);
          }
        )
        return ()=>
        {
          UnsubscribeSnapShot();
        }
      }

    })
    return ()=>
    {
      Unsubscribe();
    }
  },[])
  

  return (
    <div className='App'>
    
      <BrowserRouter>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          />


         
      <Routes>
        <Route path='/' element={<Signuppage></Signuppage>}></Route>
        <Route element={<PrivateRoutes></PrivateRoutes>}>
        <Route path='/profile' element={<Profile></Profile>}></Route>
        </Route>
        <Route path='/create-a-podcast' element={<CreateAPodcast></CreateAPodcast>}></Route>
        <Route path='/podcasts' element={<Podcast></Podcast>}></Route>
        <Route path='/podcast/:id' element={<PodcastDetailsPage></PodcastDetailsPage>}></Route>
        <Route path="/podcast/:id/create-episode" element={<CreateAnEpisode></CreateAnEpisode>}></Route>

       
      </Routes>
      
      </BrowserRouter>
    </div>
  )
}

export default App
