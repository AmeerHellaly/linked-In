/* eslint-disable no-unused-vars */
import React, { useMemo, useState } from 'react'
import './index.scss'
import { onLogout } from '../../../api/AuthApi'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../../../api/FirestoreAPIs'
export default function ProfilePopup() {
  let navigate=useNavigate()
  const [currentUser,setCurrentUser]=useState({})
  useMemo(()=>{
    getCurrentUser(setCurrentUser)
  },[])
  return (
    <div className="popup-card">
      <p className='name'>{currentUser.name}</p>
      <p className='headline'>{currentUser.headline}</p>
      
      <Button title='View Profile'
      onClick={()=>navigate('/profile',{
        state:{
          id:currentUser?.userID,
        },
      })}
      />
       <Button title='Log out' onClick={onLogout}
      />  
    </div>
  )
}
