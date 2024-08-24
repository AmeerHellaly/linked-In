/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import {AiOutlineUsergroupAdd} from "react-icons/ai"
import { useEffect,useState } from 'react'
import { getConnection } from '../../../api/FirestoreAPIs'
export default function ConnectsdUsers({user,getCurrentUser,currentUser}) {
  const [isConnected,setIsConnected]=useState(false)
  useEffect(()=>{
    getConnection(currentUser.userID,user.id,setIsConnected)
  },[currentUser.userID,user.id])
  return (
    isConnected?<></>:
    <div className='grid-child' >
      <img src={user.imageLink} alt="" />
        <p className='name'>{user?.name}</p>
        <p className='headline'>{user?.headline}</p>
        <button onClick={()=> getCurrentUser(user.id)}>
          <AiOutlineUsergroupAdd size={20} />
          Connect
          </button>
        </div>
  )
}
