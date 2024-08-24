/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useEffect, useState } from "react";
import HomeComponent from "../components/HomeComponent";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";
export default function Home({currentUser}) {
  const [loading,setLoading]=useState(true)
  const navigate=useNavigate()
  useEffect(()=>{
    onAuthStateChanged(auth,res=>
      {
        if(!res?.accessToken){
          navigate('/')
        
        }
          else {
         setLoading(false)
          }
        })
        },[])
      
  return (
loading?<Loader/>:<HomeComponent currentUser={currentUser}/>
  )
}
