/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import ProfileUserCard from './common/ProfileUserCard'
import {  getAllUsers,addConnection } from '../api/FirestoreAPIs'

export default function ProfileUserComponent({currentUser}) {
  const getCurrentUser=(id)=>{
    addConnection(currentUser.userID,id)
}

  return (
    <div>
      
     
      <ProfileUserCard currentUser={currentUser} getCurrentUser={getCurrentUser} />
      
      </div>
  )
}
