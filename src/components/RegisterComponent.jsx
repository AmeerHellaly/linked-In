/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react';
import '../Sass/LoginComponent.scss'
import { GoogleSignInAPI, RegisterAPI } from '../api/AuthApi'
import { postUserData } from '../api/FirestoreAPIs';
import { useNavigate } from 'react-router-dom';
import getUniqeId from '../helpers/getUniqeId';
import linkedinLogo from '../assets/linkedinLogo.png'
import GoogleButton from 'react-google-button';
import {  toast } from 'react-toastify';
// import { navigate } from '../helpers/useNavigate';
export default function RegisterComponent() {
  let navigate=useNavigate()
  const [credentails,setCredentials]=useState({})
  const register=async()=>{
    try{

      let res=await RegisterAPI(credentails.email,credentails.password);
       toast.success("Account Created!")
       postUserData(
        {userID:getUniqeId(),
         name:credentails.name,
         email:credentails.email,
        // imageLink:
      })
       navigate('/home')
       localStorage.setItem("userEmail",res.user.email)
    }
    catch(err){
      toast.error("Cannot Create your Account", {
      });
    }
  }

  return (
    <div className='login-wrapper'>
    <img src={linkedinLogo} className='linkedinLogo' />
    <div className='login-wrapper-inner'>
    <h1 className='heading'>Make the most of your professional life</h1>
  
      <div className='auth-inputs'>
      <input onChange={(event)=>setCredentials({...credentails,name:event.target.value})} 
      type="text" 
      className='common-input' 
      placeholder='Your Name' />
       <input onChange={(event)=>setCredentials({...credentails,email:event.target.value})} 
      type="email" 
      className='common-input' 
      placeholder=' Your Email ' />
         <input onChange={(event)=>setCredentials({...credentails,password:event.target.value})} 
      type="password" 
      className='common-input' 
      placeholder='Password (6 or more characters' />
      </div>
      <button  onClick={register}className="login-btn">Agree & Join</button> 
      </div>
      <hr className='hr-text' data-content='OR'/>
      <div className='google-btn-container'>

    
      <p className='go-to-signup'>  Already on LinkedIn? <span className='join-now' onClick={()=>navigate('/')}>Sign in</span></p>
      </div>
    
    </div>



  )
}
