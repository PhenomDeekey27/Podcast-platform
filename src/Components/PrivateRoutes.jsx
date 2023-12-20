import React from 'react'
import { auth } from '../firebase';
import {useAuthState} from "react-firebase-hooks/auth"
import { Outlet,Navigate } from 'react-router-dom';
import Loader from './Loader/Loader';


function PrivateRoutes() {
    const[user,loading,error]=useAuthState(auth);
    if(loading)
    {
        return <Loader></Loader>
    }else if(!user || error)
    {
        return <Navigate to="/" replace></Navigate>
    }else
    {
        return <Outlet></Outlet>
    }

}

export default PrivateRoutes