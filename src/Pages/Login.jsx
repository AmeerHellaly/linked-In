/* eslint-disable react-hooks/exhaustive-deps */
import LoginComponents from "../components/LoginComponents";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";
export default function Login() {
  const [loading,setLoading]=useState(true)
  const navigate=useNavigate()
  useEffect(()=>{
    onAuthStateChanged(auth,res=>
      {
        if(res?.accessToken){
          navigate('/home')
        }
        else{
         setLoading(false)
        }
      })
  },[])
  return (
 
    loading?<Loader/>:<LoginComponents/>
   
  )
}
