/* eslint-disable no-unused-vars */
import React, { useMemo, useState } from 'react'
import Topbar from '../components/common/Topbar'
import Profile from '../Pages/Profile'
import { getCurrentUser } from '../api/FirestoreAPIs'
export default function ProfileLayout() {
    const [currentUser,setCurrentUser]=useState([])
    useMemo(()=>{
        getCurrentUser(setCurrentUser)
    },[])
  return (
    <div>
    <Topbar currentUser={currentUser}/>
    <Profile currentUser={currentUser}/>
    </div>
  )
}
