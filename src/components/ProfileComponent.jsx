/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import ProfileCard from './common/ProfileCard'
import ProtfoliEdit from './common/ProtfolioEdit'

export default function ProfileComponent({currentUser}) {

  const [isEdit,setIsEdit]=useState(false)

  const onEdit=()=>{
    setIsEdit(!isEdit)
  }
  return (
    <div>
      
      {isEdit?<ProtfoliEdit currentUser={currentUser} onEdit={onEdit}/>:
      <ProfileCard currentUser={currentUser} onEdit={onEdit}/>}
      
      </div>
  )
}
