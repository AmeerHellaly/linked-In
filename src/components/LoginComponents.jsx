/* eslint-disable no-unused-vars */
// import React from 'react'
import { useState } from 'react';
import '../Sass/LoginComponent.scss'
import { LoginAPI,GoogleSignInAPI } from '../api/AuthApi'
import { useNavigate } from 'react-router-dom';
import linkedinLogo from '../assets/linkedinLogo.png'
import GoogleButton from 'react-google-button';
import {  toast } from 'react-toastify';
// import { navigate } from '../helpers/useNavigate';
export default function LoginComponents() {
  let navigate=useNavigate()
  const [credentails,setCredentials]=useState({})
  const login=async()=>{
    try{

     let res=  await LoginAPI(credentails.email,credentails.password);
       toast.success("Signed to Linkedin")
       localStorage.setItem('userEmail',res.user.email)
       navigate('/home')
    }
    catch(err){
      toast.error("Please Check your Credintails", {
      });
    }
  }
  return (
    <div className='login-wrapper'>
    <img src={linkedinLogo} className='linkedinLogo' />
    <div className='login-wrapper-inner'>
    <h1 className='heading'>Sign in</h1>
    <p className='sub-heading'>Stay updated on  your professional world </p>
      
      <div className='auth-inputs'>
      <input onChange={(event)=>setCredentials({...credentails,email:event.target.value})} 
      type="email" 
      className='common-input' 
      placeholder='Enter or Phone' />
         <input onChange={(event)=>setCredentials({...credentails,password:event.target.value})} 
      type="password" 
      className='common-input' 
      placeholder='Enter your Password' />
      </div>
      <button  onClick={login}className="login-btn">Sign In</button> 
      </div>
      <hr className='hr-text' data-content='OR'/>
      <div className='google-btn-container'>

      <p className='go-to-signup'>New to LinkedIn? <span className='join-now' onClick={()=>navigate('/register')}>Join now</span></p>
      </div>
    
    </div>



  )
}
